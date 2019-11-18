import { Command, flags } from '@oclif/command';
import React from 'react';
import { render, Box, Color, AppContext } from 'ink';

const paths = [
  { path: 'tests/login.js', status: 'runs' },
  { path: 'tests/signup.js', status: 'runs' },
  { path: 'tests/forgot-password.js', status: 'runs' },
  { path: 'tests/reset-password.js', status: 'runs' },
  { path: 'tests/view-profile.js', status: 'runs' },
  { path: 'tests/edit-profile.js', status: 'runs' },
  { path: 'tests/delete-profile.js', status: 'runs' },
  { path: 'tests/posts.js', status: 'runs' },
  { path: 'tests/post.js', status: 'runs' },
  { path: 'tests/comments.js', status: 'runs' }
];

function Jest({ log }: { log: Function }) {
  const [startTime] = React.useState(Date.now());
  type ITest = { status: string; path: string };
  type ITests = { completed: ITest[]; running: ITest[] };
  const [tests, setTests] = React.useState<ITests>({
    completed: [],
    running: paths
  });
  const [count, setCount] = React.useState(0);
  const timer = React.useRef<NodeJS.Timeout>();
  const { exit } = React.useContext(AppContext);
  const runningTests = tests.running;
  const completedTests = tests.completed;
  React.useEffect(() => {
    if (tests.running.length < 1) exit();
    tests.completed.push({
      status: Math.random() < 0.5 ? 'pass' : 'fail',
      path: paths[count].path
    });
    setTests({
      completed: tests.completed,
      running: tests.running.filter(test => test.path !== paths[count].path)
    });
    timer.current = setInterval(() => setCount(count + 1), 100);
    return () => timer.current && clearInterval(timer.current);
  }, [count]);
  return (
    <Box flexDirection="column">
      {/* <Static> */}
      {completedTests.map(test => (
        <Test key={test.path} status={test.status} path={test.path} />
      ))}
      {/* </Static> */}
      {runningTests.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          {runningTests.map(test => (
            <Test key={test.path} status={test.status} path={test.path} />
          ))}
        </Box>
      )}

      <Summary
        isFinished={runningTests.length === 0}
        passed={completedTests.filter(test => test.status === 'pass').length}
        failed={completedTests.filter(test => test.status === 'fail').length}
        time={(Date.now() - startTime) / 1000}
      />
    </Box>
  );
}

export default class JestCommand extends Command {
  static description = 'describe the command here';

  static flags = {
    name: flags.string({ char: 'n', description: 'name to print' })
  };

  static args = [{ name: 'file' }];

  async run() {
    const { flags } = this.parse(JestCommand);
    const app = render(<Jest log={this.log} />);
  }
}

/**
 *
 * Helper code and components below
 *
 *
 */

const getBackgroundForStatus = (status: string) => {
  if (status === 'runs') {
    return {
      bgYellow: true,
      black: true
    };
  }

  if (status === 'pass') {
    return {
      bgGreen: true,
      black: true
    };
  }

  if (status === 'fail') {
    return {
      bgRed: true,
      black: true
    };
  }
};

const Test = ({ status, path }: any) => (
  <Box>
    <Color {...getBackgroundForStatus(status)}>
      {` ${status.toUpperCase()} `}
    </Color>

    <Box marginLeft={1}>
      <Color dim>{path.split('/')[0]}/</Color>

      <Color bold white>
        {path.split('/')[1]}
      </Color>
    </Box>
  </Box>
);

function Summary({ isFinished, passed, failed, time }: any) {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Box>
        <Box width={14}>
          <Color bold>Test Suites:</Color>
        </Box>
        {failed > 0 && (
          <Color bold red>
            {failed} failed,{' '}
          </Color>
        )}
        {passed > 0 && (
          <Color bold green>
            {passed} passed,{' '}
          </Color>
        )}
        {passed + failed} total
      </Box>

      <Box>
        <Box width={14}>
          <Color bold>Time:</Color>
        </Box>

        {time}
      </Box>

      {isFinished && (
        <Box>
          <Color dim>Ran all test suites.</Color>
        </Box>
      )}
    </Box>
  );
}
