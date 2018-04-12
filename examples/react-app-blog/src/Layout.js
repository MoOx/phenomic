// @flow

import * as React from "react";
import Head from "react-helmet";

import Header from "./Header.js";
import Footer from "./Footer.js";

const Layout = (
  {
    title,
    image,
    noHero,
    children
  } /*: {
    title?: React.Node,
    image?: string,
    noHero?: boolean,
    children: React.Node
  } */
) => (
  <div className="Layout">
    <style
      dangerouslySetInnerHTML={{
        __html: `
        html { box-sizing: border-box; }
        *, *::before, *::after { box-sizing: inherit; }

        html, body {
          margin: 0;
          padding: 0;

          /* system font https://medium.com/designing-medium/system-shock-6b1dc6d6596f */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          color: #212529;
        }

        .Layout {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
        }

        .Layout-body {
          flex: 1 0;
        }

        .Layout-children {
          position: relative;
          max-width: 1000px;
          margin: auto;
          margin-top: -40px;
          padding: 20px 40px;
          background: #fff;
          border-radius: 3px;
          font-size: 18px;
          line-height: 2;
        }

        .Layout-children a {
          color: #69BF55;
        }

        .Layout-children p,
        .Layout-children ul,
        .Layout-children ol {
          margin-bottom: 40px;
        }

        .Layout hr {
          border: 0;
          height: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          margin: 40px;
        }
      `
      }}
    />
    <Head>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
    </Head>
    <Header title={title} image={image} light={noHero} />
    <div className="Layout-body">
      <div className="Layout-children">{children}</div>
    </div>
    <Footer />
  </div>
);

export default Layout;
