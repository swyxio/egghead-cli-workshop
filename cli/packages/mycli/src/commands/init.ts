import { Command, flags } from "@oclif/command";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];
  static strict = false;
  async run() {
    const { args, flags } = this.parse(Mycli);
    debug("parsing args", args);
    debug("parsing flags", flags);
    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: "What is your name?"
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error)
        .finally(() =>
          console.log("You can specify this with the --name flag in future")
        );
    }
    const name = flags.name || "world";
    this.log(`hello egghead ${name} from ./src/index.ts`);
  }
}

export = Mycli;
