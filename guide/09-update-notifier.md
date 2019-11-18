# Prompt Users to Update CLI Versions with Update Notifier

Your CLI might not be updated often, particularly if it is globally installed. To nudge users to keep up to date, use `update-notifier`.

```bash
npm install update-notifier
```

```js
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
 
updateNotifier({pkg}).notify();
```

## Sharing Code with a Base Oclif Command Class

You may wish to extracted shared functionality into a [separate base class](https://oclif.io/docs/base_class):

```ts
import Command from '@oclif/command'

export default abstract class extends Command {
  async init() {
    // do some initialization
    updateNotifier({pkg}).notify();
  }
}
```

and now your commands can use this instead of the default Command:

```ts
// src/commands/mycommand.ts
import Command from '../base'

export class MyCommand extends Command {
  async run() {
    // updateNotifier will run before this
  }
}
```

## Exercise

Add in an update notifier to your base command.