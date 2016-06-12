import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class AppCacheBanner extends Component {

  static propTypes = {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorError: PropTypes.string,
  }

  static defaultProps = {
    color: "#fff",
    backgroundColor: "#1cae69",
    backgroundColorError: "#d32f2f",
  };

  constructor(props) {
    super(props)
    this.state = {
      event: undefined,
    }

    // for testing UI
    if (typeof window !== "undefined") {
      window.PhenomicAppCacheBanner = this
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined" && window.applicationCache) {
      window.applicationCache.addEventListener(
        "downloading", this.appcacheDownloading, false
      )
      window.applicationCache.addEventListener(
        "error", this.appcacheError, false
      )
      window.applicationCache.addEventListener(
        "updateready", this.appcacheUpdateReady, false
      )
      // obsolete cache is when manifest is gone
      // which require an update as well
      window.applicationCache.addEventListener(
        "obsolete", this.appcacheUpdateReady, false
      )
    }
  }

  appcacheDownloading = () => {
    this.setState({ event: "downloading" })
  };

  appcacheError = () => {
    // trigger a UI error only if the download fails
    if (this.state.event === "downloading") {
      this.setState({ event: "error" })
    }
  };

  appcacheUpdateReady = () => {
    this.setState({ event: "updateready" })
  };

  handleRefresh = () => {
    try {
      window.applicationCache.swapCache()
    }
    catch (e) {
      window.location.reload()
    }
  };

  handleDismiss = () => {
    this.setState({ event: undefined })
  };

  render() {
    const { props, state } = this

    return (
      <div className={ styles.banner }>
        {
          state.event === "downloading" &&
          <div
            className={ styles.content }
            style={ {
              backgroundColor: props.backgroundColor,
              color: props.color,
            } }
          >
            <div className={ styles.message }>
              <div className={ styles.spinner } />
              { "Updating website cache..." }
            </div>
          </div>

        }
        {
          state.event === "updateready" &&
          <div
            className={ styles.content }
            style={ {
              backgroundColor: props.backgroundColor,
              color: props.color,
            } }
          >
            <div className={ styles.message }>
              { "Website cache has been updated." }
            </div>
            <div className={ styles.action }>
              <div
                role="button"
                className={ styles.button }
                onClick={ this.handleRefresh }
              >
                { "Refresh" }
              </div>
              <div
                role="button"
                className={ styles.button }
                onClick={ this.handleDismiss }
              >
                { "╳" }
              </div>
            </div>
          </div>
        }
        {
          state.event === "error" &&
          <div
            className={ styles.content }
            style={ {
              backgroundColor: props.backgroundColorError,
              color: props.color,
            } }
          >
            <div className={ styles.message }>
              { "An error occured during the website update. " }
              { "Check your network or try later." }
            </div>
            <div className={ styles.action }>
              <div
                role="button"
                className={ styles.button }
                onClick={ this.handleDismiss }
              >
                { "╳" }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
