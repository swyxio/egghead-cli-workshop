# Create a Hello World Single-Command CLI with Oclif


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
