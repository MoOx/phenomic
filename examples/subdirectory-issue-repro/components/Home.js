import React from 'react';
import Head from "react-helmet";
import { Link } from "react-router";

import Layout from './Layout'
import Posts from './Posts'

const Home = ({ isLoading, posts }) => {
  return (
    <Layout>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Everything is awesome!"/>
      </Head>
      <h1>Home</h1>
      <div><Link to="/about">About</Link></div>
      <div><Link to="/tech">Tech</Link></div>
      {isLoading && "Loading..."}
      {!isLoading && (
        <Posts posts={posts}/>
      )}
    </Layout>
  );
};

export default Home;
