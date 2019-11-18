# Parse Arguments and Flags in an Oclif Command

Let's see what you get by default.

## Help

You get nicely formatted help:

```bash
./bin/run --help
# describe the command here

# USAGE
#   $ myfirstcli [FILE]

# OPTIONS
#   -f, --force
#   -h, --help       show CLI help
#   -n, --name=name  name to print
#   -v, --version    show CLI version
```

From here you can figure out the other commands.

## Version

CLI version is important for debugging. Every CLI framework should make this a default:

```bash
./bin/run --version
# myfirstcli/0.0.0 darwin-x64 node-v10.5.0
./bin/run -v
# myfirstcli/0.0.0 darwin-x64 node-v10.5.0
```

## Running Code

We can now look into the code:

```ts
class Myfirstcli extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Myfirstcli)

    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
```

We can see how our flags and args are specified here. 

## Using flags

*[Docs](https://oclif.io/docs/flags)*

If `flags.name` is not specified, it defaults to `'world'`, and hence the default behavior is for this command to log out `hello world from ./src/index.ts`. Let's see if we can use the flag change this.

```bash
./bin/run
# hello world from ./src/index.ts
./bin/run -n Egghead
# hello Egghead from ./src/index.ts
```

## Using args

*[Docs](https://oclif.io/docs/args)*

We can see that `args.file` is only really used when `flags.force` is used. Let's do that:

```bash
./bin/run --force potato
# hello world from ./src/index.ts
# you input --force and --file: potato
```
## Flags win Arguments

Args are positional, flags are named.

When in doubt, use flags.

## Fun with Flags

Oclif comes with some best practice flag parsing built in:

```js
static flags = {
  name: flags.string({
    char: 'n',                    // shorter flag version
    description: 'name to print', // help description for flag
    env: 'MY_NAME',               // default to value of environment variable
    options: ['a', 'b'],          // only allow the value to be from a discrete set
    parse: input => 'output',     // instead of the user input, return a different value
    default: 'world',             // default value if flag not passed (can be a function that returns a string or undefined)
    required: false,              // make flag required (this is not common and you should probably use an argument instead)
    dependsOn: ['extra-flag'],    // this flag requires another flag
    exclusive: ['extra-flag'],    // this flag cannot be specified alongside this other flag
  }),

  // flag with no value (-f, --force)
  force: flags.boolean({
    char: 'f',
    default: true,                // default value if flag not passed (can be a function that returns a boolean)
    // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
    // The flag will be set to false if reversed. This functionality
    // is disabled by default, to enable it:
    // allowNo: true
  }),
}
```

See the docs for other flags we don't cover.

Oclif parsing is very flexible. These are all parsed the same way as flags:

```bash
mycli --file=foo
mycli --file foo
mycli -f foo
mycli -f=foo
mycli -ffoo
```

This is to be able to model the APIs of older CLIs like `tar`. But for documentation purposes it is best to emphasize using `mycli --file=foo` to reduce human error and potential conflicts with arguments.