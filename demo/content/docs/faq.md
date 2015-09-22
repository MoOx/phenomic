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

This is generally du to a difference of url. Currently the development server
have [a known issue](https://github.com/MoOx/statinamic/issues/22)
about not adding trailing slashes to url.
This means if you used a link like `http://0.0.0.0:3000/my/page`, you should
use `http://0.0.0.0:3000/my/page/` (note the trailing slash).
The static version use some `index.html` so it's very likely that in production
(e.g: on GitHub Pages), your url will be automatically redirected by the server.
Just be sure that all your links (in your navigation menus for example) have the
trailing slashes.
Note that this issue should only happen in development.
If that is not the case, please
[open an issue](https://github.com/MoOx/statinamic/issues/new).
