// @flow

import * as React from "react";

import Layout from "./Layout";

const PageError = ({ error } /*: { error?: Object } */) => {
  const status = (error && error.status) || 404;
  const message = error && status !== 404 ? error.statusText : "Page not found";
  const more =
    error && typeof error.json === "object"
      ? error.json.message
      : status === 404 && (
          <React.Fragment>
            {"It seems you found a broken link. "}
            {"Sorry about that. "}
            <br />
            {"Do not hesitate to report this page."}
          </React.Fragment>
        );

  return (
    <React.Fragment>
      {/* <TopBarProgressIndicator /> */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .PageError {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          padding: 1rem 0;
        }

        .PageError-oops {
          font-size: 4rem;
          line-height: 4rem;
          color: #ddd;
        }

        .PageError-title {
          margin: 4rem 0;
          font-size: 2rem;
          line-height: 3rem;
          text-align: center;
        }
      `
        }}
      />
      <Layout title={message}>
        <div className="PageError">
          <div className="PageError-oops">{"😱 Oooops!"}</div>
          <div>
            <p className="PageError-title">
              <strong>{status}</strong> {message}
            </p>
            <div>{more}</div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default PageError;
