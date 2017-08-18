import React from "react";

const Html: PhenomicHtmlType = ({ App, render }: PhenomicHtmlPropsType) => {
  const { Body } = render(<App />);
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Body />
    </html>
  );
};

export default Html;
