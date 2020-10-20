#! /usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version)

program
      .command('init <name>')
      .description('init project name')
      .action(require('./../lib/init'))
      
program.parse(process.argv)