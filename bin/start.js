#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const cpr = require('cpr');
const chalk = require('chalk');
const spawn = require('child_process').spawn;

process.title = 'ynab-api-starter-kit';
const TO = path.resolve(process.cwd(), process.argv[2] || 'ynab-api-starter-kit');
const FROM = path.resolve(__dirname, '..');

const files = [
  'src',
  'index.html',
  'package.json',
  'README.md',
  'webpack.config.js'
];

// Main

console.log(chalk.green('## YNAB API Starter Kit ##'));
copyFiles(function () {
  installDeps(function () {
    startServer()
  })
})

// Functions

function copyFiles (done) {
  let length = files.length
  function next () {
    length -= 1;
    if (length < 1) {
      done();
    }
  }
  console.log(chalk.cyan('  Copying files...'));
  files.forEach(function (file) {
    const frompath = path.resolve(FROM, file);
    const topath = path.resolve(TO, file);
    cpr(frompath, topath, next);
  });
}

function installDeps (done) {
  console.log(chalk.cyan('  Installing dependencies...'));
  const s = crossPlatformSpawn('npm', ['install'], { cwd: TO });
  s.on('close', done);
}

function startServer () {
  console.log(chalk.cyan('  Starting up...'));
  console.log(chalk.green('Press `control + c` to stop the dev server.'));
  console.log(chalk.green('Run `npm start` in the project folder to start it again.'));
  console.log(chalk.green('Press `control + c` to stop the dev server.'));
  console.log(chalk.green('Enjoy!'));
  crossPlatformSpawn('npm', ['start'], { cwd: TO });
}

function crossPlatformSpawn (cmd, args, options) {
  options.shell = os.platform() === 'win32';
  return spawn(cmd, args, options);
}
