// @flow

import * as React from "react";
import {
  withPhenomicApi,
  query,
  BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

import pkg from "../package.json";

import Layout from "./Layout";
import PageError from "./PageError";
import ActivityIndicator from "./ActivityIndicator";
import LatestPosts from "./LatestPosts";

const Page = ({ hasError, isLoading, page, posts }) =>
  hasError ? (
    <PageError error={page.error} />
  ) : (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .Page {
          position: relative;
        }

        .Page-content {
          margin-bottom: 40px;
        }
        `
        }}
      />
      <Layout
        title={(page && page.node && page.node.title) || pkg.title}
        image={page && page.node && page.node.image}
      >
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <React.Fragment>
            <div className="Page-content">
              {page &&
                page.node &&
                page.node.body && <BodyRenderer>{page.node.body}</BodyRenderer>}
            </div>
            <hr />
            <LatestPosts node={posts.node} error={posts.error} />
          </React.Fragment>
        )}
      </Layout>
    </React.Fragment>
  );

export default withPhenomicApi(Page, props => ({
  page: query({
    path: "content/pages",
    id: props.params.splat || ""
  }),
  posts: query({
    path: "content/posts",
    limit: 4,
    after: props.params.after
  })
}));
