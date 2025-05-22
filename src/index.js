#!/usr/bin/env node
const {program} = require('commander');
const { replicate } = require('./commands/replicate-tabs.js');

program.command('replicate-tabs').action(replicate).addArgument('levels', 'Levels to replicate').description('Replicate JSON data from clipboard')
program.parse();