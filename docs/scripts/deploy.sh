#!/usr/bin/env bash

./node_modules/.bin/gh-pages \
  --repo https://$GITHUB_TOKEN@github.com/MoOx/statinamic.git \
  --dist docs/dist
