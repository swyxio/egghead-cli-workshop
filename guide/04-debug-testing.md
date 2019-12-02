# Set up Debugging and Testing for CLI's

## Debugging

The generalized debugging method you should know about, available with no setup, is the `--inspect` flag:

```bash
node --inspect-brk index.js
```

and then go to `chrome://inspect` to use Chrome DevTools to step through Node.

However, sometimes you want to enable your user to log out certain diagnostic information. Oclif already comes instrumented with this. Run:

```bash
DEBUG=* myfirstcli dev
```

and see oclif's internals stream out. The `*` is a glob matcher, you can filter out or in `oclif` messages or other messages. You can use this for both performance and error analysis.

As you write your CLI's you're going to want to add your own debug calls. That's easy:

```bash
yarn add debug 
```

and now you can use it everywhere in your code!

```js
// index.js
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';
 
// fake app
 
debug('booting %o', name);
 
http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});
 
// fake worker of some kind
 
require('./worker');

// worker.js
var a = require('debug')('worker:a')
  , b = require('debug')('worker:b');
 
function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}
 
work();
 
function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}
 
workb();
```

## Testing

Install dependencies

```bash
yarn add jest
yarn add -D @oclif/test # v1 at time of writing

## for typescript
yarn add jest-diff # v20 at time of writing
yarn add -D @types/jest ts-jest  # v24 at time of writing
```

Set up Jest config:

```js
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/tests/jest/**/*.ts'],
  transform: {'\\.ts$': 'ts-jest/preprocessor'},
  coverageReporters: ['lcov', 'text-summary'],
  // collectCoverage: !!`Boolean(process.env.CI)`,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/templates/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
```

A basic (non Oclif) jest test looks like this - it can be helpful (and much faster) to test core logic outside of Oclif commands:

```js
// /tests/jest/foo.ts
import {add} from '../../src'
// or in plain node.js
// const {add} = require('../../src')

describe('add', () => {
  test('1+2=3', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

When testing the command itself:

```js
import {test} from '@oclif/test'

describe('hello', () => {
  test
    .stdout()
    .command(['dev']) // the command
    .it('runs dev', ctx => {
      expect(ctx.stdout).toBe('hello world')
    })

  test
    .stdout()
    .command(['dev', '--name', 'jeff'])
    .it('runs dev --name jeff', ctx => {
      expect(ctx.stdout).toBe('hello jeff')
    })
})
```

## Principles

- Always test on Windows/Linux (Circle CI/GH Actions matrix may be best bet here)
- OClif provides debug logging by default. Log levels: “More info is nice, until there’s too much to see”. Log levels help filter for the thing you’re looking for by using a regex. 
