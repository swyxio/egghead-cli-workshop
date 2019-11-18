# Build Interactive CLI Components with React Ink

React-Ink is a React renderer to the CLI. This is interesting because it lets you write your CLI's as React components - which makes rerendering inline easy - and the [Yoga](https://github.com/facebook/yoga) Layout engine which uses the Flexbox model in your CLI UI's. This is so compelling that we felt we had to include some discussion of this in this workshop.

```bash
yarn add react ink
```

TypeScript users: You'll need to modify your `tsconfig.json`:

```js
{
  "compilerOptions": {
    // what you had, plus...
    "jsx": "react",
    "esModuleInterop": true
  },
  // etc
}
```

## Patching Oclif for TSX files

At time of writing, oclif doesn't yet recognize `.tsx` files. You may choose to drop down to `.js` or you may monkey patch oclif with `patch-package`:

- Head to `node_modules/@oclif/config/lib/plugin.js`
- add a line to the glob patterns used in `get commandIDs()` to find commands

```js
const patterns = [
    '**/*.+(js|ts)',
    '**/*.+(js|ts)x', // add this
    '!**/*.+(d.ts|test.ts|test.js|spec.ts|spec.js)',
];
```
- You can now proceed, and for CI/CD purposes, use `patch-package` to persist your changes
- `yarn add -D patch-package postinstall-postinstall`
- add 

```js
"scripts": {
+  "postinstall": "patch-package"
}
```
- run `yarn patch-package @oclif/config`
- this generates a diff that you can check in to your git repo, so that it will be reinstalled on CI/CD/cloning.


## Oclif + React-Ink

and now you can write a new command with an Ink rendering layer:

```tsx
// src/commands/ink.tsx
import { Command, flags } from '@oclif/command';
import React from 'react';
import { render, Box, AppContext } from 'ink';

function Counter({ name }: { name: string }) {
  const [count, setCount] = React.useState(0);
  const timer = React.useRef<NodeJS.Timeout>();
  const { exit } = React.useContext(AppContext);
  React.useEffect(() => {
    if (count > 9) exit();
    timer.current = setInterval(() => setCount(count + 1), 100);
    return () => timer.current && clearInterval(timer.current);
  });
  return (
    <Box>
      {name} Iteration #{count}
    </Box>
  );
}

export default class Ink extends Command {
  static description = 'describe the command here';

  static flags = {
    name: flags.string({ char: 'n', description: 'name to print' })
  };

  static args = [{ name: 'file' }];

  async run() {
    const { flags } = this.parse(Ink);
    const app = render(<Counter name={flags.name || 'Counter'} />);
    // Counter will use AppContext to exit, or we could manually app.unmount() ourselves
  }
}
```

Run it and see the running counter:

```bash
myfirstcli ink
Counter Iteration #10
```



## Pastel vs Oclif

Ink comes paired with a first party framework called [Pastel](https://github.com/vadimdemedes/pastel), which you may find useful. It does the same thing with filesystem based setup of commands and uses React proptypes for adding flags and args. For the time being, Oclif is better maintained and production tested, so we choose not to use Pastel, but this may change in future.

