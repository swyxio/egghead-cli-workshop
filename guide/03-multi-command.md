# Understand when to use Multi-Command vs Single-Command in Oclif

Multi command vs Single command

## Switching Single to Multi

We'll be making the new command: `myfirstcli dev`.

Move the current single command to a file named the same as your new subcommand, e.g. from `src/index.ts` to `src/commands/dev.ts`

You'll still need an `index.ts`, so add one:

```ts
// this is your new src/index.ts
export { run } from '@oclif/command';
```

This provides some basic boilerplate for multi commands. There is a dependency we'll need soon so install it:

```bash
yarn add globby
```

One more piece of config to do in `package.json`:

```js
// package.json
{
  // ...
  "oclif": {
    "bin": "myfirstcli",
    "commands": "./lib/commands" // add this
  },
}
```

This tells oclif where to look for its multi commands.

Now try it!

```bash
./bin/run dev
```



## Add New Command

```bash
oclif command build
```

Generates a new `build` command!



You can also set up the multi command from scratch:

```bash
npx oclif multi mymulticli
```

