#!/usr/bin/env node

console.log('hello world');
const args = process.argv.slice(2);
const dir = args[0];
const name = args[1].split('--name=')[1];
console.log({ dir, name });
console.log('i can write CLIs!');
