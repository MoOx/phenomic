import React from "react";
import Head from "react-helmet";
import { Router, Route, browserHistory, Link } from "react-router";
import {
  createApp,
  renderApp,
  createContainer,
  query,
  BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

const Home = ({ isLoading, posts }) =>
  <Layout>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awesome!" />
    </Head>
    <h1>Home</h1>
    {isLoading && "Loading..."}
    {!isLoading &&
      <ul>
        {posts &&
          posts.node &&
          posts.node.list &&
          posts.node.list.map(post =>
            <li key={post.id}>
              <Link to={`/blog/${post.id}/`}>{post.title || post.id}</Link>
            </li>
          )}
      </ul>}
    <div>
      {posts.node &&
        posts.node.hasPreviousPage &&
        <Link
          to={
            posts.node.previousPageIsFirst
              ? `/`
              : `/after/${posts.node.previous}/`
          }
        >
          Newer posts
        </Link>}
      {" "}
      {posts.node &&
        posts.node.hasNextPage &&
        <Link to={`/after/${posts.node.next}/`}>Older posts</Link>}
    </div>
  </Layout>;

const HomeContainer = createContainer(Home, props => ({
  posts: query({
    collection: "posts",
    limit: 2,
    after: props.params.after
  })
}));

const DefaultPostLayout = ({ title, body }) =>
  <article>
    <Head><title>{title}</title></Head>
    <h1>{title}</h1>
    <BodyRenderer>{body}</BodyRenderer>
  </article>;

const HeroPostLayout = ({ title, body }) =>
  <article>
    <Head><title>{title}</title></Head>
    <div style={{ padding: "4rem", background: "pink", color: "#fff" }}>
      <h1>{title}</h1>
    </div>
    <BodyRenderer>{body}</BodyRenderer>
  </article>;

const PostLayouts = {
  default: DefaultPostLayout,
  hero: HeroPostLayout
};

const BlogPost = ({ hasError, isLoading, page }) => {
  if (hasError) {
    return <PageError error={page.error} />;
  }

  const PostLayout =
    (page.node && PostLayouts[page.node.layout]) || PostLayouts.default;
  return (
    <Layout>
      {isLoading && "Loading..."}
      {!isLoading && page.node && <PostLayout {...page.node} />}
      <footer>
        <Link to="/">Go to home</Link>
      </footer>
    </Layout>
  );
};

const BlogPostContainer = createContainer(BlogPost, props => ({
  page: query({ collection: "posts", id: props.params.splat })
}));

const PageError = ({ error }) => {
  const status = (error && error.status) || 404;
  const message = error && status !== 404 ? error.statusText : "Page not found";

  return (
    <div>
      <Head>
        <title>{message}</title>
      </Head>
      <h1>{message}</h1>
    </div>
  );
};

const Layout = ({ children }) =>
  <div>
    <Head>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <header>
      {/* ... */}
    </header>
    <div>{children}</div>
    <footer>
      {/* ... */}
    </footer>
  </div>;

const Html = props => {
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {props.body}
        {props.state}
        {props.script}
      </body>
    </html>
  );
};

const routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/after/:after" component={HomeContainer} />
    <Route path="/blog/*" component={BlogPostContainer} />
    <Route path="*" component={PageError} />
  </Router>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
