# Read User Config with Cosmiconfig

User input is great, but gets repetitive after a while and users often just want a place to store the config.

The choice and design of CLI user config is a huge topic on its own:

- do you use a dynamic `.js` file? it is easy for the user to extend the config, but also easy for the user to write bad/nonperformant code. You can't perform much static analysis and so the opportunities for developer experience aren't high.
- do you use a `.json` file? what if you want comments? maybe a `yaml` file instead? or [toml](https://github.com/toml-lang/toml)? or what about [Dhall lang](https://github.com/dhall-lang/dhall-lang)?
- where should the config sit? what should your CLI do when your user uses you inside a monorepo?

You can't possibly make everyone happy, but making conscious decisions on these common questions can help you design with less regret.

## `Cosmiconfig`

Node.js doesn't have formal conventions for CLI configs, but the best in class library I've found for standardized consumption of configs is [`cosmiconfig`](https://github.com/davidtheclark/cosmiconfig).

By default, Cosmiconfig will start where you tell it to start and search up the directory tree for the following:

- a `package.json` property
- a JSON or YAML, extensionless "rc file"
- an "rc file" with the extensions `.json, .yaml, .yml, or .js`.
- a `.config.js` CommonJS module

For example, if your module's name is "myapp", cosmiconfig will search up the directory tree for configuration in the following places:

- a `myapp` property in package.json
- a `.myapprc` file in JSON or YAML format
- a `.myapprc.json` file
- a `.myapprc.yaml`, `.myapprc.yml`, or `.myapprc.js` file
- a `myapp.config.js` file exporting a JS object

Comsiconfig is [very configurable](https://github.com/davidtheclark/cosmiconfig#cosmiconfigoptions) - you can modify where it searches and where it stops and how it loads.

## Installing

```bash
yarn add cosmiconfig
```

and code:

```js
const { cosmiconfigSync } = require('cosmiconfig');
// most of time sync searching is fine
const explorerSync = cosmiconfigSync('myfirstcli');
const searchedFor = explorerSync.search();
const loaded = explorerSync.load(pathToConfig);
// now you can use
// loaded.config - the parsed config object
// loaded.filepath - the path to the found config
```

You can see the docs for [async search](https://github.com/davidtheclark/cosmiconfig#usage) as well.

## Exercise

Use `cosmiconfig` to make the `--name` flag optional by adding a `.myfirstclirc.js`