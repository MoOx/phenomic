import React from 'react';
import Head from "react-helmet";
import { Link } from "react-router";

import Layout from './Layout'
import Posts from './Posts'

const Tech = ({ isLoading, posts }) => {
  return (
    <Layout>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Everything is awesome!"/>
      </Head>
      <h1>Tech</h1>
      {isLoading && "Loading..."}
      {!isLoading && (
        <Posts posts={posts}/>
      )}
      <footer>
        <Link to="/">Go to home</Link>
      </footer>
    </Layout>
  );
};

export default Tech;
