#!/usr/bin/env node
'use strict';

const MemFS = require('memory-fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const fs = require('fs');

const inputFilename = process.argv[2];
const outputFilename = inputFilename.replace(/\.js$/, '.qbundled.js');

const compiler = webpack({
  entry: inputFilename,
  output: {
    filename: outputFilename,
    path: process.cwd()
  },
  optimization: {
    minimize: false
  },
  target: 'node',
  externals: [nodeExternals()]
});
const memfs = new MemFS();
compiler.outputFileSystem = memfs;
compiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  const outputPath = path.resolve(process.cwd(), outputFilename);
  const data = memfs.readFileSync(outputPath, 'utf8');
  const packageLock = require(path.join(process.cwd(), 'package-lock.json'));
  const packageLockJson = JSON.stringify(cleanLock(packageLock), null, 2);

  fs.writeFileSync(outputPath, `${makePreamble()}

/**package-lock ${packageLockJson} **/
    
${data}`);
  console.log(`bundle written to ${outputPath}`);
});

function cleanLock(lockData) {
  delete lockData.name;
  delete lockData.version;
  if (lockData.dependencies) {
    for (const dep of Object.values(lockData.dependencies)) {
      cleanLock(dep);
    }
  }
  return lockData;
}

function makePreamble() {
  const loader = require.resolve('qdd/qdd-loader.js');
  const data = `// BEGIN qdd loader
{
${fs.readFileSync(loader, 'utf8')}
module.treeNode = getLockTree(__filename);
currentParent = module;
}
// TODO this actually needs makeRequireFunction, not just module.require
require = module.require.bind(module);
// END qdd loader`;
  return data;
}
