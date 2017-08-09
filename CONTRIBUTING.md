# ⚠️ wip

--- 

# To use/modify Phenomic from git locally, you can

## Play with the docs

Open on terminal in project root (let say ~/phenomic) and one in (~/phenomic/docs).
Then run `npm start` from docs to get the dev server running, and run `npm run transpile` from root everytime you modify a file from packages/*. This will work for development mode. **Note that whenever you modify the server or a plugin you might need to restart the dev server after transpilation.**

## Play with your own project
 
Sort of the same thing must be done, with a local trick for linking phenomic packages.
So clone this repo, run yarn on npm install, then do "npm run link", that should create local links for each packages.
Then in your project, use `npm link @phenomic/core @phenomic/preset-react-app` (and all other direct `@phenomic/*` deps from your package.json.
Then run your code, and don't forget to transpile each time you change phenomic code (+restart dev server if necessary).

It's not optimal so I will try to automate this somehow but it's better than modifying transpiled node_modules.
