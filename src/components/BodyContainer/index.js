// @flow

import React, { Component } from "react"

type Props = {
  children: React$Element<any>
}

class BodyContainer extends Component<void, Props, void> {

  render(): React$Element<any> {
    const { props }: { props: Props } = this

    return (
      <div>
      {
        React.Children.map(props.children, (child: any, i) => {
          if (typeof child === "string") {
            return (
              <div
                key={ i }
                className="phenomic-BodyContainer"
                dangerouslySetInnerHTML={ { __html: child } }
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
