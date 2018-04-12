// @flow

import * as React from "react";
import { Link } from "@phenomic/preset-react-app/lib/client";

const LatestPosts = (
  { node, error } /*: { node?: Object, error?: Object } */
) => (
  <React.Fragment>
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .LatestPosts {
          margin-bottom: 20px;
        }

        .LatestPosts h2 {
          text-align: center;
          margin: 0;
          padding: 20px;
          color: #323232;
        }

        .LatestPosts-list {
          max-width: 600px;
          margin: auto;
          padding: 0;
        }

        .LatestPosts-list-item {

        }

        .LatestPosts-list-item-link {
          display: block;
          color: #323232 !important;
          font-size: 18px;
          padding: 5px;
        }

        .LatestPosts-nav {
          font-size: 14px;
          margin-top: 40px;
          text-align: center;
        }

        .LatestPosts-nav a {
          color: #0067b9;
        }
        `
      }}
    />
    <div className="LatestPosts">
      <h2>Latests Post</h2>
      {error && <div className="error">{error.statusText}</div>}
      {node &&
        node.list && (
          <React.Fragment>
            <ul className="LatestPosts-list">
              {node.list.map(post => (
                <li key={post.id} className="LatestPosts-list-item">
                  <Link
                    to={`/blog/${post.id}/`}
                    className="LatestPosts-list-item-link"
                  >
                    {post.title || post.id}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="LatestPosts-nav">
              {node &&
                node.previous && (
                  <Link
                    to={
                      node.previousPageIsFirst
                        ? `/blog/`
                        : `/blog/after/${node.previous}/`
                    }
                  >
                    Newer posts
                  </Link>
                )}{" "}
              {node &&
                node.next && (
                  <Link to={`/blog/after/${node.next}/`}>Older posts</Link>
                )}
            </div>
          </React.Fragment>
        )}
    </div>
  </React.Fragment>
);

export default LatestPosts;
