#!/usr/bin/env zsh

# some module require to share the same instance during runtime
mkdir -p node_modules
rm -rf node_modules/react
ln -s ../../node_modules/react node_modules/react

rm -rf node_modules/react-helmet
ln -s ../../node_modules/react-helmet node_modules/react-helmet

rm -rf node_modules/webpack
ln -s ../../node_modules/webpack node_modules/webpack

cd ../ && npm i && cd demo
