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
        "error", this.handleError, false
      )
      window.applicationCache.addEventListener(
        "downloading", this.handleDownloading, false
      )
      window.applicationCache.addEventListener(
        "cached", this.handleDismiss, false
      )
      window.applicationCache.addEventListener(
        "updateready", this.handleUpdateReady, false
      )
      // obsolete cache is when manifest is gone
      // which require an update as well
      window.applicationCache.addEventListener(
        "obsolete", this.handleUpdateReady, false
      )
    }
  }

  handleError = () => {
    // trigger a UI error only if the download fails
    if (this.state.event === "downloading") {
      this.setState({ event: "error" })
    }
  };

  handleDismiss = () => {
    this.setState({ event: undefined })
  };

  handleDownloading = () => {
    this.setState({ event: "downloading" })
  };

  handleUpdateReady = () => {
    this.setState({ event: "updateready" })
  };

  handleRefresh = () => {
    // this call is useless since it's applied only for new downloads
    // (so will not update the current view)
    // window.applicationCache.swapCache()
    window.location.reload()
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
              { "Caching website data..." }
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
