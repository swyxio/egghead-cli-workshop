# Future

What is the future of CLI's? 

- Rust rewrites https://swc-project.github.io/
- UI CLI's? [Vue is leading the way](https://twitter.com/swyx/status/1074389991613128705)
- Dry run CLI's https://github.com/gatsbyjs/gatsby/issues/16384
- [More Adaptive CLI's](https://www.youtube.com/watch?v=ZueoIYnHiaI&feature=emb_title)

## Last Notes

At the end of the day, Node CLI's are just Node programs with user interfaces. Much of the advanced Node CLI questions you'll have are the same as Node questions.

- Cross Platform: According to the 2018 Node.js user survey, 24% of Node.js developers use Windows locally and 41% use Mac. In production 85% use Linux and 1% use BSD.
  - https://github.com/ehmicky/cross-platform-node-guide
- Node TSC Working Groups:
	- https://nodejs.org/en/about/working-groups/
	- Node.js Tooling Group https://github.com/nodejs/tooling
- More workshops on Advanced Node:
	- Digging into Node with Kyle Simpson: https://frontendmasters.com/workshops/digging-into-node/
	- https://frontendmasters.com/learn/node-js/
- Egghead Lessons:
	- [Reduce Boilerplate with yargs middleware in a Node.js Command Line Tool](https://egghead.io/lessons/node-js-reduce-boilerplate-with-yargs-middleware-in-a-node-js-command-line-tool) by Khaled Garbaya
	- [Create an Interactive Node.js Command Line Tool using Inquirer](https://egghead.io/lessons/node-js-create-an-interactive-node-js-command-line-tool-using-inquirer) by Paul McBride
	- [Pass command line arguments to node.js](https://egghead.io/lessons/node-js-pass-command-line-arguments-to-node-js) by Will Button
	- (in future) [This workshop!](https://egghead.io/courses/build-custom-cli-tooling-with-oclif-and-react-ink)

Keep up to date on Oclif:

- Oclif Blog: https://oclif.io/blog/
- Oclif Conf videos: https://oclif.io/blog/2019/09/16/oclifconf-recap

Keep up to date on the state of the art on CLI's:

- https://github.com/sw-yx/cli-cheatsheet

## One last Command

There are a TON of other Ink components - it is still early days! Here's a fun one:

```tsx
import React from 'react';
import { Command, flags } from '@oclif/command';

import {
  render,
  Box
} from 'ink';
// @ts-ignore
import Gradient from 'ink-gradient';
// @ts-ignore
import BigText from 'ink-big-text';

function SearchQuery() {
  return (
    <Box>
      <Gradient name="pastel">
        <BigText text="GO MAKE CLI'S!!!" />
      </Gradient>
    </Box>
  );
}

export default class Stream extends Command {
  static description = 'describe the command here';
  async run() {
    const { args, flags } = this.parse(Stream);

    const app = render(<SearchQuery />);
  }
}
```

Other inbuilt gradients: 

```bash
	'cristal',
	'teen',
	'mind',
	'morning',
	'vice',
	'passion',
	'fruit',
	'instagram',
	'atlas',
	'retro',
	'summer',
	'pastel',
	'rainbow'
```

## Call to Action

- Take a thing you do everyday and wrap it into a CLI
- Look at an Open Source project that doesn’t have a CLI, and add one on top of it (e.g. gatsby new, gatsby develop, gatsby build, gatsby clean).