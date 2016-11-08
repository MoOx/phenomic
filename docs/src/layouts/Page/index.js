import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import { joinUri, BodyContainer } from "phenomic"

import Loading from "../../components/Loading"
import EditThisPage from "../../components/EditThisPage"
import Banner from "../../components/Banner"
import ContentWrapper from "../../components/ContentWrapper"

import styles from "./index.css"

const Page = (
  {
    isLoading,
    __filename,
    __url,
    head,
    body,
    children,
  },
  {
    metadata: { pkg },
  }
) => {
  invariant(
    typeof head.title === "string",
    `Your page '${ __filename }' needs a title`
  )

  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "description", content: head.description },
  ]

  const PageActions = (
    <div className={ styles.pageActions }>
      <EditThisPage filename={ __filename } />
    </div>
  )

  return (
    <div className={ styles.page }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      {
        head.title &&
        <Banner small>
          <h1 className={ styles.title }>{ head.title }</h1>
          {
            head.subtitle &&
            <h2 className={ styles.subtitle }>{ head.subtitle }</h2>
          }
        </Banner>
      }
      <ContentWrapper>
        {
          // to avoid "weird" visual result, we put actions at the top only
          // if page has a title, other wise (eg: homepage) it can be a little
          // weird
          head.title &&
          PageActions
        }
        {
          head.incomplete &&
          <div className={ styles.callout + " " + styles.calloutWarning }>
            <strong className={ styles.calloutTitle }>
              { "Incomplete" }
            </strong>
            {
              "This documentation is still a work in progress and might " +
              "be incomplete."
            }
          </div>
        }
        {
          isLoading
          ? <Loading />
          : body &&
          <div className={ styles.content }>
            <BodyContainer>{ body }</BodyContainer>
          </div>
        }
        { children }
        { PageActions }
      </ContentWrapper>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
