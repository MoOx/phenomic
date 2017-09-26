import React from 'react';
import Head from "react-helmet";

const Layout = ({ children }) => (
  <div>
    <Head>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <header>{/* ... */}</header>
    <div>{children}</div>
    <footer>{/* ... */}</footer>
  </div>
);

export default Layout;
