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
