# Store State on Filesystem in CLI's respecting XDG-spec with Conf

Most of the time, your CLI UX can be improved by remembering what the user last used (because that is likely to be what they want again). You can store a short list of previous entries and use that to autocomplete or rank future interactions. Even better, you can store all this locally so there are no privacy implications, just pure benefit to your user using you over time.

Things you can store:

- authentication tokens
  - careful about storing unencrypted passwords
- preferences
- prior selections from a list
- performance caches
- offline sync actions
- `frecency` storage (more info next!)
- *whatever you want, within reason*

In other words, **your CLI should have memory**. 

However, most of us tend to write CLI's as stateless scripts (Apart from state, there are [other problems with this](https://www.youtube.com/watch?v=ZueoIYnHiaI&feature=emb_title)).

I suspect this is mostly because we aren't aware how easy it can be to store state in CLI's. If we knew how easy it was, we'd do it more often.

## The XDG Spec

The question of *where* to store state isn't obvious until you realize that many CLI's will simply want to store state globally. This is because CLI's are ideally going to be used repeatedly over many different projects, so you need a central place to call home to. However, developers are very finnicky about you randomly leaving stuff on disk, and would like a way to customize that behavior.

The standard that everyone has agreed on is [the XDG Spec](https://wiki.archlinux.org/index.php/XDG_Base_Directory), which uses 4 environment variables: 

- `XDG_CONFIG_HOME` for user-specific configurations (default `$HOME/.config`)
- `XDG_CACHE_HOME` for user-specific non-essential (cached) data (default `$HOME/.cache`)
- `XDG_DATA_HOME` for user-specific data files (default `$HOME/.local/share`)
- `XDG_RUNTIME_DIR` for temporary, non-essential, user-specific data files such as sockets, named pipes (no default)

The main ones you'll use are the first three.

You *could* write all the `fs.writeFile` and `fs.readFile` and other checks to access these things (use [`env-paths`](https://github.com/sindresorhus/env-paths#pathsconfig) to check the XDG paths), or you could just use a library.

## [Conf](https://www.npmjs.com/package/conf)

`conf` is Sindre Sorhus' second attempt at writing a config store library after learning these lessons.

```bash
yarn add conf
```

It's a simple get and set API with some nice dot notation access thrown in:

```js
const Conf = require('conf');
 
const config = new Conf();
// config.path // see the path to the config file
 
config.set('unicorn', '🦄');
console.log(config.get('unicorn'));
//=> '🦄'
 
// Use dot-notation to access nested properties
config.set('foo.bar', true);
console.log(config.get('foo'));
//=> {bar: true}
 
config.delete('unicorn');
console.log(config.get('unicorn'));
//=> undefined
```

## Exercise: Store and retrieve the last 5 selections for your Autocomplete

Tip: you can write separators in your choice array:

```js
const colors = require('ansi-colors');
const { prompt } = require('enquirer');

prompt({
  type: 'select',
  name: 'separator-example',
  message: 'Pick your favorite color',
  choices: [
    'apple',
    'grape',
    { role: 'separator', value: colors.dim('────') },
    'watermelon',
    'cherry',
    'strawberry',
    { role: 'separator', value: colors.dim('────') },
    'lemon',
    'orange'
  ]
})
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
```

## Principles

- Offer to persist state when possible to create defaults
- If you have an input, you should have autocomplete of past 3-5 things so user can hit down
