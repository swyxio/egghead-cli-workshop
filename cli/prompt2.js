#!/usr/bin/env node
const { prompt } = require('enquirer');
const Conf = require('conf');
const config = new Conf();
const colors = require('ansi-colors');
const presets = [
  'apple',
  'grape',
  'watermelon',
  'cherry',
  'strawberry',
  'lemon',
  'orange'
];
const priorChoices = config.get('choices') || [];
const separator = priorChoices &&
  priorChoices.length && { role: 'separator', value: colors.dim('────') };
const choices = [
  ...priorChoices,
  separator,
  ...presets.filter((x) => !priorChoices.includes(x))
].filter(Boolean);

(async function() {
  await prompt({
    type: 'select',
    name: 'color',
    message: 'Pick your favorite color',
    choices
  })
    .then((result) => {
      config.set('choices', [result.color, ...priorChoices].slice(0, 3));
      return result;
    })
    .then(console.log)
    .catch(console.error);
})();
