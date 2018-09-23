const cowsay = require('cowsay');

module.exports = (req, res) => {
  res.send(`<pre>${cowsay.say({
    text: `Hello, ${req.params.name}!`
  })}</pre>`);
};
