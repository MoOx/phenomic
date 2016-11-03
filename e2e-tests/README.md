# End to end tests

End-to-end testing is a methodology used to test whether the flow of an
application is performing as designed from start to finish.

Tests here need to be run with a transpiled sources & a test folder ready to run

```console
npm run transpile
npm run test-setup:prepare
npm run e2e:tests
```

Otherwise you can just use `npm test` to run every tests.
