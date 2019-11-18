# Polish CLI Output with Ora, CLI-UX, and Chalk

CLI output can look extremely unfriendly and confusing. These libraries are the meat-n-potatoes of presenting your information better.

## Chalk

This is THE library for terminal string styling. [There are others](https://github.com/sw-yx/cli-cheatsheet#user-content-output), but :shrug:.

```bash
npm install chalk
```

the API is really simple:

```js
const chalk = require('chalk');
 
console.log(chalk.blue('Hello world!'));
```

Some basic design principles apply:

- save `red` for errors, `green` for success.
- `cyan` is a good informational color
- There's no `pink`, it's `magenta`
- always echo user inputted strings in a different color, this helps the user scan
- mind the fact that some users use light terminals! Yellow on white often doesn't look great.
- experiment with `bg*` and `bg*Bright` colors, and `bold` modifier for easy visual wins
- some users may not be able to distinguish your colors. Don't relay information purely based on color alone!
- check how your console output looks overall! a mess of colors all over is confusing.
- too many colors is also confusing! 


As a rule, you'll want to leave most of your strings in template literal style so you can use chalk with minimal fuss (there are also VSCode extensions for you to toggle string styles).

```js
const chalk = require('chalk');
 
console.log(`You wrote: ${chalk.blue('Hello world!')}. Well done!`);
```

## CLI-UX

```bash
npm install cli-ux
```

CLI-UX is oclif's first party utility library. It includes prompting, although we are more interested in its other API's:

- `cli.url(text, uri)`: Create a hyperlink (if supported in the terminal)
- `cli.open`: Open a url in the browser
- `cli.annotation`: Shows an iterm annotation
- `cli.wait`: Waits for 1 second or given milliseconds
- `cli.action`: Shows a spinner

![https://raw.githubusercontent.com/oclif/cli-ux/HEAD/assets/action.gif](https://raw.githubusercontent.com/oclif/cli-ux/HEAD/assets/action.gif)

- `cli.table`: Displays tabular data

```js
import {Command} from '@oclif/command'
import {cli} from 'cli-ux'
import axios from 'axios'
 
export default class Users extends Command {
  static flags = {
    ...cli.table.flags()
  }
 
  async run() {
    const {flags} = this.parse(Users)
    const {data: users} = await axios.get('https://jsonplaceholder.typicode.com/users')
 
    cli.table(users, {
      name: {
        minWidth: 7,
      },
      company: {
        get: row => row.company && row.company.name
      },
      id: {
        header: 'ID',
        extended: true
      }
    }, {
      printLine: this.log,
      ...flags, // parsed flags
    })
  }
}
```

- `cli.tree`: Generate a tree and display it

```
├─ foo
└─ bar
   └─ baz
```

## Ora


Ora is THE spinner library. Much of your CLI time will be spent doing asynchronous, expensive tasks, might as well give users something pretty to look at.

You can also use `cli-spinners`, also from Sindre ([full demo](https://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/)). The moon spinner is pretty cool.

```bash
npm install ora
# or npm install cli-spinners
```

![https://github.com/sindresorhus/cli-spinners/raw/master/screenshot.svg?sanitize=true](https://github.com/sindresorhus/cli-spinners/raw/master/screenshot.svg?sanitize=true)


## Exercise

Write a command where you load and display user data, nicely colorized, with an appropriate spinner. 

## Principles

- Colors should work on light & dark backgrounds but shouldn’t be the sole indicator. (e.g. warning shouldn’t be “pink text” but be “warning: pink text”)
- There’s a higher bar for responsiveness in CLI's - hitting enter should show something to show the CLI accepted input
-  Don’t clear screen- it’s hostile to other CLIs. Respect that others may be operating alongside.