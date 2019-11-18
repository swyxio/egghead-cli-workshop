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
  }
}
