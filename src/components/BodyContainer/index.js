import React, { Component } from "react"

type Props = {
  children: React$Element<any>
}

class BodyContainer extends Component<void, Props, void> {

  render(): React$Element<any> {
    const { props }: { props: Props } = this
    const { children, ...otherProps } = props

    let child
    if (typeof children === "string") {
      child = children
    }
    else {
      try {
        child = React.Children.only(children)
      }
      catch (e) {
        console.log("phenomic: BodyContainer: multiple childs")
      }
    }

    if (child) {
      return (
        <div
          className="phenomic-BodyContainer"
          dangerouslySetInnerHTML={{ __html: child }}
          { ...otherProps }
        />
      )
    }

    return (
      <div { ...otherProps }>
        {
        React.Children.map(children, (child: any, i) => {
          if (typeof child === "string") {
            return (
              <div
                key={ i }
                className="phenomic-BodyContainer"
                dangerouslySetInnerHTML={{ __html: child }}
              />
            )
          }
          return child
        })
      }
      </div>
    )
  }
}

export default BodyContainer
