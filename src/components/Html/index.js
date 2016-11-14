// @flow

import React from "react"

type Props = {
  htmlProps: Object,
  head: string,
  body: string,
  script: string,
  config: PhenomicStaticConfig,
  children?: any,
}

const Html = (props: Props) => (
  <html { ...props.htmlProps }>
    <head dangerouslySetInnerHTML={{ __html: props.head }} />
    <body>
      <div
        id="phenomic"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {
        props.config.clientScripts &&
        <script dangerouslySetInnerHTML={{ __html: props.script }} />
      }
      { props.config.clientScripts && props.children }
    </body>
  </html>
)

export default Html
