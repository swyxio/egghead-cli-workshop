# Set up Testing for Oclif CLI's

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
  testMatch: ['<rootDir>/test/jest/**/*.ts'],
  transform: {'\\.ts$': 'ts-jest/preprocessor'},
  mapCoverage: true,
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
// /test/jest/foo.ts
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