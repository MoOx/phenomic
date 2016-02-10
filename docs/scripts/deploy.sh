#!/usr/bin/env bash

git config --global user.email "gh-pages@localhost"
git config --global user.name "npm gh-pages"

./node_modules/.bin/gh-pages \
  --silent \
  --repo https://$GITHUB_TOKEN@github.com/MoOx/statinamic.git \
  --dist docs/dist
