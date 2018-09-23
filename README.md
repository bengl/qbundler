# qbundler

Given a node app (in its fully installed state) with a `package-lock.json`,
**`qbundler`** will create a bundled file containing all the app's JavaScript
files. When the file is run, it will be run with [`qdd`](https://npm.im/qdd)'s
`qdd-node` automatically, with an in-line package-lock, so dependencies will be
installed to and loaded from the `qdd` cache.

[`webpack`](https://npm.im/webpack) is used to create the bundle. At the moment,
only default options are supported (e.g. no support for non-JS files in your
app's directory).

> Note: This is pretty experimental and might break with many apps. It's really
> just at the proof-of-concept stage right now.

Install it globally and pass it a relative path to your entrypoint file. The
`package-lock.json` will be read from the current working directory.

### Example

```
$ npm i -g qdd # qdd must be installed globally for the loader to work
$ npm i # make sure everything is in place for the bundler
$ npx qbundler ./index.js
bundle written to $PWD/index.qbundled.js
$ cp index.qbundled.js /tmp/ # putting it in a completely different place
$ cd /tmp
$ node index.qbundled.js
# app works!
```

## Contributing

See CONTRIBUTING.md.

This project uses the Developer's Certificate of Origin. See DCO.txt.

## Code of Conduct

See CODE_OF_CONDUCT.md.

## License

MIT License. See LICENSE.txt.
