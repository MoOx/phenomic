// @flow

import * as React from "react";
import jsonFetch from "simple-json-fetch";
import { withInitialProps, Link } from "@phenomic/preset-react-app/lib/client";

import Layout from "./Layout";
import PageError from "./PageError";
import ActivityIndicator from "./ActivityIndicator";

type props = {|
  status: "loading" | "ready" | "error",
  error?: any,
  repos?: $ReadOnlyArray<Object>,
  prev?: number,
  next?: number,
  first?: number
  // last?: number,
|};

const endpoint =
  "https://api.github.com/users/MoOx/repos?type=owner&sort=updated&per_page=5";

class PageRepositories extends React.PureComponent<props, void> {
  // SSR and CSR
  static async getInitialProps({ params }) {
    const res = await jsonFetch(endpoint + "&page=" + (params.page || "1"));
    return {
      repos: res.json,
      ...getPagesProps(res)
    };
  }

  // SSR only
  static async getAllPossibleUrls({ path }) {
    if (!path.includes(":page")) return [path];
    const res = await jsonFetch(endpoint);
    return (
      [...Array(getPagesProps(res).last + 1).keys()]
        .slice(2) // skip 0 (useless) & 1 (as 1 is the root)
        .map(page => path.replace(":page", page))
        // just for the demo, github api is limited to 60 call per hour without auth
        // so we just pre-render 3 pages
        .slice(0, 3)
    );
  }

  render() {
    const { status } = this.props;
    return status === "error" ? (
      <PageError error={this.props.error} />
    ) : (
      <React.Fragment>
        <style
          dangerouslySetInnerHTML={{
            __html: `
        .PageRepositories {
          position: relative;
        }

        .PageRepositories-content {
          margin-bottom: 40px;
        }

        .PageRepositories-repo {
          position: relative;
        }

        .PageRepositories-repo-date {
          color: #bbb;
          font-size: 10px;
        }

        .PageRepositories-repo-star {
          position: absolute;
          top: 0;
          right: 0;
        }

        .PageRepositories-nav {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        `
          }}
        />
        <Layout
          title={"My repositories"}
          image="https://images.unsplash.com/photo-1454165205744-3b78555e5572?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=863ffeea823f0ffb0885fe1a5e77e645&auto=format&fit=crop&w=900&q=60"
        >
          {status === "loading" && <ActivityIndicator />}
          {status === "ready" &&
            this.props.repos && (
              <React.Fragment>
                <div className="PageRepositories-content">
                  {this.props.repos.map(repo => (
                    <React.Fragment key={repo.name}>
                      <div className="PageRepositories-repo">
                        <a href={repo.html_url}>
                          <strong>{repo.name}</strong>
                        </a>
                        <div>{repo.description}</div>
                        <div className="PageRepositories-repo-date">
                          Updated: {new Date(repo.updated_at).toUTCString()}
                        </div>
                        <div className="PageRepositories-repo-star">
                          ★ {repo.stargazers_count}
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
                <div className="PageRepositories-nav">
                  <div className="PageRepositories-nav-item">
                    {this.props.prev && (
                      <Link
                        to={
                          this.props.prev === this.props.first
                            ? `/repositories/`
                            : `/repositories/page/${this.props.prev}/`
                        }
                      >
                        Previous repositories
                      </Link>
                    )}
                  </div>
                  <div className="PageRepositories-nav-item">
                    {this.props.next && (
                      <Link to={`/repositories/page/${this.props.next}/`}>
                        More repositories
                      </Link>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}
        </Layout>
      </React.Fragment>
    );
  }
}

export default withInitialProps(PageRepositories);

/* Transform GitHub HTTP `Link` header to an object

  '<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=15>; rel="next",
  <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel="last",
  <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=1>; rel="first",
  <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=13>; rel="prev"'

  becomes

  {
    next: 15,
    last: 34,
    first: 1,
    prev: 13,
  }
*/
function getPagesProps(
  res: Response
): {|
  prev?: number,
  next?: number,
  first?: number,
  last: number
|} {
  const link = res.headers.get("Link") || res.headers.get("link");
  const almostParams = link.split(/(page=\d+>; rel="[a-z]+)"/);
  const pages = {};
  for (let i = 1; i < almostParams.length; i = i + 2) {
    const page = almostParams[i]
      .replace("page=", "")
      .replace('; rel="', "")
      .split(">");
    pages[page[1]] = parseInt(page[0], 10);
  }
  // $FlowFixMe we know what we receive :)
  return pages;
}
