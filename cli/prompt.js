#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs');
const Conf = require('conf');
const config = new Conf();
console.log({ configPath: config.path });
(async function() {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    default: config.get('name')
  })
    .then((result) => {
      config.set('name', result.name);
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
