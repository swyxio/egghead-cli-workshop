# Intro to Node CLIs

What are your favorite CLI's?

- https://github.com/paulirish/github-email
- https://github.com/rupa/z
- https://github.com/netlify/cli
- https://github.com/ChristopherBiscardi/gatsby-theme

## A quick CLI to run

```bash
npx swyx
```

You can see my business card here!

This is a trivial example but you can clone and publish your own: https://github.com/bnb/bitandbang

## NPM and CLI's

If you look at https://github.com/bnb/bitandbang, you'll see these fields in `package.json`:

```js
// https://github.com/bnb/bitandbang
  "main": "/bin/card.js", // primary entry point
  "bin": {
    "bitandbang": "./bin/card.js" // install this in the .bin folder as a CLI!
  },
  "files": [ // only package these files when publishing to npm, nice to have for smaller node_modules
    "bin/card.js",
    "bin/output"
  ],
```

And when you look into [`/bin/card.js`](https://github.com/bnb/bitandbang/blob/master/bin/card.js) you see this weird thing called a shebang:

```js
#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

'use strict'

const fs = require('fs')
const path = require('path')
const output = fs.readFileSync(path.join(__dirname, 'output'), 'utf8')
console.log(output)
```

![https://media0.giphy.com/media/DPtj3FaOaENO0/giphy.gif](https://media0.giphy.com/media/DPtj3FaOaENO0/giphy.gif)

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