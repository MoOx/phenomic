import React from 'react';
import { Link } from "react-router";

const Posts = ({ posts }) => (
  <ul>
    {posts &&
    posts.node &&
    posts.node.list &&
    posts.node.list.map(post => {
      const regex = /^posts\/(.+?)\.md$/g;
      const link = `/${regex.exec(post.filename)[1]}`;
      const label = `[${post.category}] ${post.title}`;

      return (
        <li key={post.id}>
          <Link to={link}>{label}</Link>
        </li>
      )
    })}
  </ul>
);

export default Posts;
