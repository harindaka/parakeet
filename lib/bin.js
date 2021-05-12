#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package')
const { https, http, tcp, udp } = require('./index')

program
  .version(pkg.version)
  .option('-p, --port <number>', 'port to listen on', Number)
  .option('-a, --address <address>', 'network address to listen on', String)
  .option('-k, --key <key>', 'SSL private key', String)
  .option('-c, --certificate <certificate>', 'SSL certificate', String)

program
  .command('http')
  .description('start HTTP echo server')
  .action(() => http(program))

program
  .command('https')
  .description('start HTTPs echo server')
  .action(() => https(program))

program
  .command('tcp')
  .description('start TCP echo server')
  .action(() => tcp(program))

program
  .command('udp')
  .description('start UDP echo server')
  .action(() => udp(program))

program
  .command('*', false, { noHelp: true })
  .action(() => program.help())

program
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help()
}
