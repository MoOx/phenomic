#!/usr/bin/env bash

if [ "$TRAVIS" = "true" ]
then
  git config --global user.email "gh-pages@localhost"
  git config --global user.name "npm gh-pages"
fi

./node_modules/.bin/gh-pages \
  --silent \
  --repo https://$GITHUB_TOKEN@github.com/MoOx/phenomic.git \
  --dist docs/dist
