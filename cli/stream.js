#!/usr/bin/env node
const { spawn } = require('child_process');
const child = spawn('ls', ['-lh', '/usr']);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
