import React from 'react';
import { Command, flags } from '@oclif/command';

import {
  render,
  Box
  // Static, Color, Text
} from 'ink';
// import Input from 'ink-text-input';
// @ts-ignore
import Gradient from 'ink-gradient';
// @ts-ignore
import BigText from 'ink-big-text';

function SearchQuery() {
  return (
    <Box>
      <Gradient name="pastel">
        <BigText text="🌈 CLI Workshop!" />
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
