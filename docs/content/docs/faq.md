---
title: FAQ
---

## I have a React warning about invalid checksum, what is wrong with my code?

You might see something like

```
Warning: React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:
 (client) .4">Usage</a></nav><noscript data-reacti
 (server) .4">Usage</a></nav><div data-reactid=".p1 statinamic-client.js:1134:8
```

The message is pretty clear. You have to examine your code and check carefully
what can be rendered differently. Feel free to ask for help on the support chat.

Here is some common cases for this warning

### Date and time

Due to the different timezone between build server and your visitors, generated
date and can be different. You should set timezone when generating date.

Example with `moment.js`

```diff
-- moment(data).format("DD MMM YYYY")
++ moment(date).utc().format("DD MMM YYYY")
```

### Navigation links with active class

With statinamic, a user can request a page with or with out trailing `index.html`.
If you are using `react-router` `<Link />` component with `activeClassName` property,
React will warn the above message. We provided a `<LinkWrapper />` component to
cover this case.

```diff
-- import { Link } from "react-router"
++ import { Link } from "statinamic/lib/Link"
```

## Can I use different font matter format in markdown files ?

Yes. Statinamic supports YAML, JSON, TOML out of the box. You can change the language by
specifying it after the first delimiter (eg: ---)

Example:

```markdown
---json
{
  "title": "Statinamic is awesome"
}
---
```

For more information, please refer to [gray-matter's documentation](https://www.npmjs.com/package/gray-matter)
