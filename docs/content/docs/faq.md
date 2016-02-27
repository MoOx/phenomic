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

Here are some common cases for this warning:

### Date and time

Due to the different timezone between the build server and your visitors, generated
date and time can be different. To fix this, ensure that the timezone is
correctly set.

Example with `moment.js`

```diff
-- moment(data).format("DD MMM YYYY")
++ moment(date).utc().format("DD MMM YYYY")
```

### Navigation links with active class

With statinamic, a user can request a page with or without the trailing `index.html`.
If you are using `react-router` `<Link />` component with the `activeClassName` property,
React will warn with the above message. We provided a `<LinkWrapper />` component to
cover this case.

```diff
-- import { Link } from "react-router"
++ import { Link } from "statinamic/lib/Link"
```
