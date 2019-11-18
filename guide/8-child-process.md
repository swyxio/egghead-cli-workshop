# Execute and Pipe Child Processes with Execa

Often your CLI will want to call other CLI's, or execute code in parallel. You'll want to do these in child processes.

Node has a nice [child process](https://nodejs.org/api/child_process.html#child_process_child_process) API:

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']); // calling a *nix command and passing args

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

## Standard Streams

CLI's are pipable based on 3 streams: `stdin`, `stdout` and `stderr`. You can accept data piped in from other CLI's with stdin ([get-stdin](https://npm.im/get-stdin) may help parse), but the ones you'll deal with most are `stdout` (for normal logging) and `stderr` (for when errors happen).

Inside Oclif commands, you should write `this.log` and `this.error` accordingly for nonblocking logging to these streams, instead of using the normal `console.log` and `console.error`.

This takes on an extra layer of complexity where child processes are concerned - should your CLI pass through the streams of its children? Is it confusing if messages are intermingled? You can even [pipe output from one child to its sibling](https://2ality.com/2018/05/child-process-streams.html). Child Processes can also [send event info up to parents](https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917) (inter-process communication).


## `execa`

There are a number of [annoying cross platform nuances](https://github.com/ehmicky/cross-platform-node-guide/blob/master/docs/4_terminal/file_execution.md) to take note off when dealing with child processes. To save your sanity, use `execa`.

```bash
yarn add execa
```

```js
const execa = require('execa');

const subprocess = execa('echo', ['foo'])

subprocess.stdout.pipe(process.stdout);
// or subprocess.all.pipe(process.stdout); // both stdout and stderr
// or subprocess.stdout.pipe(fs.createWriteStream('stdout.txt')) // write to file

// or
// const subprocess = execa(execPath, args, { stdio: 'inherit' }) // pass on all std streams

// close this process when subprocess closes
subprocess.on('close', code => process.exit(code))
subprocess.on('SIGINT', process.exit)
subprocess.on('SIGTERM', process.exit)
```

### Process killing

We now have CLI's that may not exit right away since we have to wait for child processes to execute. You can prematurely terminate with a successful operation with `process.exit(0)`. You may see advice to `process.exit(1)` if there has been an error (this is helpful for CI/CD services to know if your operation failed and they should not proceed) - however this may prematurely cut off some logging - it may be better to set `process.exitCode = 1` or just throw an uncaught error. [See this StackOverflow discussion.](https://stackoverflow.com/questions/5266152/how-to-exit-in-node-js).

[Here's a list of Node exit codes](https://stackoverflow.com/a/47163396) if you'd like to stick to convention.

## Exercise

Execute your scaffolded code upon scaffolding, save errors to a file, and exit your CLI when your child process is done.