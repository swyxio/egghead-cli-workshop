# Build Your Own Boilerplate Scaffolding CLI with Copy-Template-Dir

One of the [unfair advantages](https://twitter.com/swyx/status/1108576496229048321) CLI's have is in being able to scaffold working code into the user's project. This is better than docs that the user has to look up to copy-paste. This has been a big part of Rails productivity, and Angular has built this in with [`ng generate`](https://angular.io/guide/schematics).

## Option 1: Yeoman 

In fact one of the most successful CLI projects in Node.js is [Yeoman](https://yeoman.io/), which is a generic scaffolding system that has been very successful. However, it does rely on global installs, which you can't always assume.

One of the core insights of this workshop is that every tool or workflow can ship a small CLI for developer experience. You should be able to incrementally add templating functionality, instead of dropping out to a separate globally installed CLI.

## Option 2: Express

You're also going to find a lot of templating libraries from the Express ecosystem:

- https://www.npmjs.com/package/consolidate
- https://www.npmjs.com/package/ejs
- as well as specific template flavors:
  - http://mustache.github.com/mustache.5.html
  - https://github.com/wycats/handlebars.js
  - https://github.com/Shopify/liquid

These basically help server render strings of HTML by combining templates and data, on a per-request basis. Useful for SSR, but needs a bit of work to make usable for whole-folder work. [Plop.js](https://github.com/plopjs/plop) is an interesting effort here, again with a dedicated CLI.

## Option 3: Copy-Template-Dir

The biggest bang for your buck you will get is by dumping whole folders of code. The best library for this is [`copy-template-dir`](https://www.npmjs.com/package/copy-template-dir). Given a source folder and a destination folder, copy from one to the other.

```js
const copy = require('copy-template-dir')
const path = require('path')
 
const vars = { foo: 'bar' }
const inDir = path.resolve(__dirname, '../templates') // careful! see below
const outDir = path.join(process.cwd(), 'dist')
 
copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) throw err
  createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
  console.log('done!')
})

// promise based
(new Promise((yay, nay) => {
  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) nay(err)
    else yay(createdFiles)
  })
}))
  .then(() => console.log('done'))
  .catch(err => throw err)
```

## Exercise

Make your CLI scaffold out from a source folder contained within it to a folder that the user inputs.

## Special Notes

### Path resolution

You should be crystal clear where your paths are coming from, particularly switching contexts between how you see your library and how your user will see your library. Here are things you will normally use:

- `process.cwd()` where the user runs your CLI from, typically (but not always!) the project root - great for destination directories
- `__dirname` the module's current folder, great for source directories
- `path.resolve()` a great function for normalizing between absolute and relative paths

Where possible, prefer to `path.join()` rather than concatenate strings, because stray slashes cause annoying errors (`/foo/` vs `/foo` vs `//foo//bar` etc).

### Temp folders

To do some projects, especially if you are wrapping CLI's, you will want to scaffold out to a temp folder, then run code on that folder, then delete that folder. Alternatively, for caching purposes, you may want to write to a temp folder which cleans up after itself. These projects will help:

- https://www.npmjs.com/package/tempy (create unique temp directories)
- https://www.npmjs.com/package/tmp (very popular. can remove on exit)

### Low level copying

It is easy to `fs.writeFileSync` all the time, but you may run into scaling issues with large files as well as parallel processing. The best practice is to use Node streams. Of course there are some libraries that help, e.g. https://www.npmjs.com/package/cpy. Generally this is an optimization step you won't have to worry about most of the time.

## Principles

- Scaffolding is nice to have “caramel not sugar”.
- “Remote vs. Local templates”- templates are either shipped with the CLI, or remotely downloaded. URL assumes you’re online A) slowing you down B) have to be online. Default attitude for Node.js is “you’re online”. 
- If you don’t split templates from CLI, you have to keep telling people to bump versions (e.g. create-react-app never updates, just the react-scripts)
