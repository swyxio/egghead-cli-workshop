import { flags } from "@oclif/command";
import Base from "../base";
var debug = require("debug")("mycli:init");
const { prompt } = require("enquirer");
const copy = require("copy-template-dir");
const path = require("path");
const { spawn } = require("yarn-or-npm");
class Mycli extends Base {
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
    // debug("parsing args", args);
    // debug("parsing flags", flags);

    if (typeof flags.name === "undefined") {
      if (this.config && this.config.name) {
        flags.name = this.config.name;
      } else {
        flags.name = await prompt({
          type: "input",
          name: "name",
          message: "What is the folder name?"
        })
          .then(({ name }: { name: string }) => name)
          .catch(console.error)
          .finally(() =>
            console.log("You can specify this with the --name flag in future")
          );
      }
    }
    const name = flags.name;

    const vars = { projectName: name };
    const inDir = path.resolve(__dirname, "../templates/rollup-react");
    const outDir = path.join(process.cwd(), name);

    copy(inDir, outDir, vars, async (err: Error, createdFiles: string[]) => {
      if (err) throw err;
      process.chdir(outDir);
      const { stdout } = await spawn(["install"]);
      console.log(stdout);
    });
  }
}

export = Mycli;
