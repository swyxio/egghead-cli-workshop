# Create Dynamic Command Line User Interfaces with React Ink Input Components

Although `enquirer` gives us a lot out of the box, we might be able to create more interesting CLI UI's with React Ink because of its layout approach. We can take advantage of some first party inputs:

- https://github.com/vadimdemedes/ink-text-input
- https://github.com/vadimdemedes/ink-select-input
- https://github.com/jdeniau/ink-tab
- https://github.com/maticzav/ink-table
- https://github.com/JureSotosek/ink-divider

We can take these components and put together really advanced UI's inside of our CLI:

```tsx
import { Command, flags } from '@oclif/command';

import React from 'react';
import { render, Box, Static, Color, Text } from 'ink';
import Input from 'ink-text-input';

function SearchQuery({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = React.useState('');
  const [entries, setEntries] = React.useState<string[]>([]);

  const handleSubmit = (query: string) => {
    // Do something with query
    setEntries([...entries, query]);
    setQuery('');
  };

  return (
    <Box justifyContent="center">
      <Box width="80%" flexDirection="column-reverse">
        <Box marginRight={1}>
          <Box marginRight={1}>
            <Color hex="#000000" bgHex="#FFFFFF">
              <Text bold>Enter your query</Text>
            </Color>
            :
          </Box>
          <Input
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder={placeholder}
          />
        </Box>
        <Box>
          <Static>
            {entries.map((entry, id) => (
              <Box key={id}>{entry}</Box>
            ))}
          </Static>
        </Box>
      </Box>
    </Box>
  );
}

export default class Stream extends Command {
  static description = 'describe the command here';
  async run() {
    const { args, flags } = this.parse(Stream);

    const app = render(
      <SearchQuery placeholder={flags.placeholder || 'Counter'} />
    );
  }
}
```

