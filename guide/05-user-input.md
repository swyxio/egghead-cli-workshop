# Beautiful Prompts for User Input with Enquirer

Supplying flags means remembering what they are, and looking up docs. We can do better by prompting for input where required.

Of course, you could write your own using raw Node.js, but you'd have to implement a bunch of UX niceties (including cross-platform [key bindings](https://github.com/enquirer/enquirer#-key-bindings)) and validation. You should take advantage of libraries for this - the framework you use might offer some basic prompting. 

<details>
<summary>
<b>

`oclif-ux` example

</b>
</summary>
For example, oclif itself ships a basic `cli-ux` library:

```js
import {Command} from '@oclif/command'
import cli from 'cli-ux'

export class MyCommand extends Command {
  async run() {
    // just prompt for input
    const name = await cli.prompt('What is your name?')

    // mask input after enter is pressed
    const secondFactor = await cli.prompt('What is your two-factor token?', {type: 'mask'})

    // hide input while typing
    const password = await cli.prompt('What is your password?', {type: 'hide'})

    this.log(`You entered: ${name}, ${secondFactor}, ${password}`)
  }
}
```
</details>

## Using Enquirer

However the library we will recommend is [`enquirer`](https://www.npmjs.com/package/enquirer), because it is fast and likely to have all the features you will ever want for best-in-class CLI UX, and you can [customize it](https://github.com/enquirer/enquirer#-custom-prompts) to write whatever prompt experiences you like. Of course, this is subject to change, so look out for features you like over any individual library.

The two caveats to note about `enquirer` is that it doesnt yet have strong TypeScript support (the authors don't use TS, they just ship a basic `.d.ts`, so you may have to patch types using declaration merging) and the authors prefer a high number of transitive dependencies (because of small module reuse). If you want these and can trade off some of Enquirer's features, [`inquirer`](https://github.com/SBoudrias/Inquirer.js) is your best bet.

These are the [built in prompts](https://www.npmjs.com/package/enquirer#built-in-prompts) you get:

* [AutoComplete Prompt](https://github.com/enquirer/enquirer#autocomplete-prompt)
* [BasicAuth Prompt](https://github.com/enquirer/enquirer#basicauth-prompt)
* [Confirm Prompt](https://github.com/enquirer/enquirer#confirm-prompt)
* [Form Prompt](https://github.com/enquirer/enquirer#form-prompt)
* [Input Prompt](https://github.com/enquirer/enquirer#input-prompt)
* [Invisible Prompt](https://github.com/enquirer/enquirer#invisible-prompt)
* [List Prompt](https://github.com/enquirer/enquirer#list-prompt)
* [MultiSelect Prompt](https://github.com/enquirer/enquirer#multiselect-prompt)
* [Numeral Prompt](https://github.com/enquirer/enquirer#numeral-prompt)
* [Password Prompt](https://github.com/enquirer/enquirer#password-prompt)
* [Quiz Prompt](https://github.com/enquirer/enquirer#quiz-prompt)
* [Survey Prompt](https://github.com/enquirer/enquirer#survey-prompt)
* [Scale Prompt](https://github.com/enquirer/enquirer#scale-prompt)
* [Select Prompt](https://github.com/enquirer/enquirer#select-prompt)
* [Sort Prompt](https://github.com/enquirer/enquirer#sort-prompt)
* [Snippet Prompt](https://github.com/enquirer/enquirer#snippet-prompt)
* [Toggle Prompt](https://github.com/enquirer/enquirer#toggle-prompt)

### Installing

```bash
yarn add enquirer
```

A basic enquirer prompt looks like this:

```js
const { prompt } = require('enquirer');
 
// assuming you are in an async block
const response = await prompt({
  type: 'input',
  name: 'username',
  message: 'What is your username?'
});
 
console.log(response); // { username: 'jonschlinkert' }
```

Once you're familiar with the [prompt options API](https://github.com/enquirer/enquirer#prompt-options) you can use them pretty much everywhere:

```js
{
  // required
  type: string | function,
  name: string | function,
  message: string | function | async function,

  // optional
  initial: string | function | async function, // The default value to return if the user does not supply a value.
  format: function | async function, // Function to format user input in the terminal.
  result: function | async function, // Function to format the final submitted value before it's returned.
  validate: function | async function, // Function to validate the submitted value before it's returned. This function may return a boolean or a string. If a string is returned it will be used as the validation error message.

  // each command will also recognize additional options
  // e.g. `limit`, `choices`, `hint`, `fields`
}
```

Let's practice a little by adding an AutoComplete prompt:

```js
const { prompt } = require('enquirer');

// inside async block
const response = await prompt({
  type: 'autocomplete',
  name: 'flavor',
  message: 'Pick your favorite flavor',
  limit: 10,
  choices: [
    'Almond',
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Chocolate',
    'Cinnamon',
    'Coconut',
    'Cranberry',
    'Grape',
    'Nougat',
    'Orange',
    'Pear',
    'Pineapple',
    'Raspberry',
    'Strawberry',
    'Vanilla',
    'Watermelon',
    'Wintergreen'
  ]
});
```

## Principle: Don't Block CI

Even though you may not expect it, your CLI is often going to be used in automated processes, where prompting is going to be a blocker. So here are some principles to help your CLI be CI friendly:

- every prompt should have a corresponding flag that skips the prompt
- every prompt should inform the user about what flag they can use to skip the prompt (nice to have)

The one exception where you can freely prompt in CLIs are usecases you would -never- use in CI, e.g. commands and processes that don't terminate, like `gatsby develop` or `jest --watch`.
