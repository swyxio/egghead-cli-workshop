# Create a Hello World Single-Command CLI with Oclif

## Anatomy of a CLI

A minimum viable CLI can be a simple JS file:

```js
#!/usr/bin/env node
console.log('hello world!')
```

*nix systems also require you to mark these files as executable before you run them:

```bash
chmod +x foo.js   # mark executable
./foo.js          # run the file
# hello world!
```

You can of course read arguments and require modules and do all sorts of interesting things:

```js
#!/usr/bin/env node
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
```

Then you may want to parse the arguments in a consistent way, provide help documentation, add TypeScript, add a plugin system, add a nice debugging developer experience...

## CLI Frameworks

There are a number of frameworks/parsing libraries that help you do this:

- [**Commander**](https://github.com/tj/commander.js/): Built by TJ, used in `create-react-app`, `vue-cli`, and many others. Key feature: pluggability. [**Vorpal**](https://github.com/dthree/vorpal) is another framework inspired by Commander and is seeking maintainers
- [**Oclif**](https://github.com/oclif/oclif): Built by Heroku, used in [Heroku](https://github.com/heroku/cli) and [Salesforce](https://developer.salesforce.com/tools/sfdxcli) CLI's. Key feature: pluggability.
- [**Sade**](https://github.com/lukeed/sade): Built by lukeed, used in [tsdx](https://github.com/palmerhq/tsdx). Key feature: lightweight?
- [**Gluegun**](https://github.com/infinitered/gluegun): Built by Infinite Red, used in [Ignite](https://github.com/infinitered/ignite) and [AWS Amplify](https://github.com/aws-amplify/amplify-cli). Key feature: templating/filesystem
- [**Ink**](https://github.com/vadimdemedes/ink): Built by Vadim & Sindre. Key Feature: React Components and Yoga Layout. See also [import-jsx](https://npm.im/import-jsx)
- [**Scritch**](https://github.com/jamiebuilds/scritch): Built by Jamie, used at Eventbrite. Key Feature: compose multiple scripts regardless of language into one CLI.
- [**Yargs**](https://github.com/yargs/yargs): Built by [bcoe](https://github.com/bcoe), used by `webpack-cli`, `mocha`, `react-native`, `nyc`, and 14,343 other modules.
- [**arg**](https://github.com/zeit/arg): Built by [ZEIT](https://github.com/zeit), used by `now`, `ncc`, `micro`, `serve`, and many others. Key Feature: [tiny](https://packagephobia.now.sh/result?p=arg)
- [**cac**](https://github.com/cacjs/cac): Built by [Egoist](https://github.com/egoist), used by `create-nuxt-app` and many others.

## Why Oclif

https://oclif.io/docs/features

Oclif is both a CLI framework and a CLI that scaffolds CLI's for you:

```bash
npx oclif single myfirstcli
```

and answer the prompts:

```bash

     _-----_     ╭──────────────────────────╮
    |       |    │      Time to build a     │
    |--(o)--|    │  single-command CLI with │
   `---------´   │  oclif! Version: 1.14.2  │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? npm package name myfirstcli
? command bin name the CLI will export myfirstcli
? description My first CLI!
? author sw-yx
? version 0.0.0
? license MIT
? Who is the GitHub owner of repository (https://github.com/OWNER/repo) final
? What is the GitHub name of repository (https://github.com/owner/REPO) myfirstcli
? Select a package manager yarn
? TypeScript Yes
? Use tslint (linter for TypeScript) No
? Use mocha (testing framework) No
? Add CI service config (Press <space> to select, <a> to toggle all, <i> to invert selection)
   create package.json
   create tsconfig.json
   create .editorconfig
   create README.md
   create .gitignore
   create bin/run
   create bin/run.cmd
   create src/index.ts
```

Congrats! you have created your first CLI! More importantly, you used a CLI to create a CLI *maximum meta*.

We are using TypeScript for this workshop, but feel free to choose JavaScript if that is your preference.

```bash
cd myfirstcli
./bin/run
# hello world from ./src/index.ts
```

Of course, your users won't be running your CLI from within a cloned git repo's folder. You'll publish it:

```bash
npm publish --access=public
```

And they'll be installing it, something like this:

```bash
# not real code - just an example

## example 1: global dep
yarn add --global myfirstcli
## in project folder
myfirstcli init


## example 2: local dep
yarn add myfirstcli
## in project folder
yarn myfirstcli init
```

However for local development you don't want to reinstall your CLI every time. Use symlinking:

```bash
## example 1: global dep
## in CLI folder
yarn link --global
## in project folder
myfirstcli init

## example 2: local dep
## in CLI folder
yarn link 
## in project folder
yarn link myfirstcli
yarn myfirstcli init
```


## Publishing

https://oclif.io/docs/releasing#npm

```bash
npm version (major|minor|patch) # bumps version, updates README, adds git tag
npm publish
```
