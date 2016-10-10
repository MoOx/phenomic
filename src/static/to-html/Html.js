// @flow
import React from "react"

type Props = {
  htmlProps: Object,
  head: string,
  body: string,
  script: string,
  children: any,
}

const Html = (props: Props) => (
  <html { ...props.htmlProps }>
    <head
      dangerouslySetInnerHTML={{
        __html: props.head,
      }}
    />
    <body>
      <div
        id="phenomic"
        dangerouslySetInnerHTML={{
          __html: props.body,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: props.script,
        }}
      />
      { props.children }
    </body>
  </html>
)

export default Html
