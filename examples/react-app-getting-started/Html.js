import React from "react";
import Head from "react-helmet";

const Html = ({ App, render }) => {
  const { Body } = render(<App />);
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <Body {...helmet.bodyAttributes.toComponent()} />
    </html>
  );
};

export default Html;
