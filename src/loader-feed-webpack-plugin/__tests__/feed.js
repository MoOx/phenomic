import test from "jest-ava-api"

import feed from "../feed"

test("phenomic loader feed helper", (t) => {

  const feedXML = feed({
    feedOptions: {
      title: "test",
      site_url: "http://phenomic.test/",
    },
    destination: "feed.xml",
    collection: [
      {
        title: "One",
        date: "2015-01-01",
        description: "<strong>One</strong>",
        __url: "/page/one/",
      },
      {
        title: "Two",
        date: "2015-12-31",
        description: "<strong>Two</strong>",
        __url: "/page/two/",
      },
    ],

    // for testing
    xmlOptions: { indent: "  " },
  })
  // skip date to avoid failing test because of one second
  .replace(
    /<lastBuildDate>([^<]*)<\/lastBuildDate>/,
    "<lastBuildDate>REPLACED_FOR_TEST</lastBuildDate>"
  )

  /* eslint-disable max-len */
  const feedXMLexpected = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[test]]></title>
    <description><![CDATA[test]]></description>
    <link>http://phenomic.test/</link>
    <generator>RSS for Node</generator>
    <lastBuildDate>REPLACED_FOR_TEST</lastBuildDate>
    <atom:link href="http://phenomic.test/feed.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title><![CDATA[One]]></title>
      <description><![CDATA[<strong>One</strong>]]></description>
      <link>http://phenomic.test/page/one/</link>
      <guid isPermaLink="true">http://phenomic.test/page/one/</guid>
      <pubDate>Thu, 01 Jan 2015 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title><![CDATA[Two]]></title>
      <description><![CDATA[<strong>Two</strong>]]></description>
      <link>http://phenomic.test/page/two/</link>
      <guid isPermaLink="true">http://phenomic.test/page/two/</guid>
      <pubDate>Thu, 31 Dec 2015 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`

  t.is(
    feedXML,
    feedXMLexpected,
    "should generate a feed from a collection"
  )
})
