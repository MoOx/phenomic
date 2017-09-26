import React from 'react';
import Head from "react-helmet";
import { Link } from "react-router";
import {BodyRenderer, textRenderer} from '@phenomic/preset-react-app/lib/client';

import Layout from './Layout'
import PageError from './PageError'

const Post = ({ hasError, isLoading, page }) => {
  if (hasError) {
    return <PageError error={page.error} />;
  }

  return (
    <Layout>
      {isLoading && "Loading..."}
      {!isLoading && page.node &&
      <article>
        <Head>
          <title>{page.node.title}</title>
          <meta
            name="description"
            content={textRenderer(page.node.body).slice(0, 150) + "…"}
          />
        </Head>
        <h1>{page.node.title}</h1>
        <BodyRenderer>{page.node.body}</BodyRenderer>
      </article>}
      <footer>
        <Link to="/">Go to home</Link>
      </footer>
    </Layout>
  );
};

export default Post;
