module.exports = (req, res) => {
  const url = 'http://localhost:3000/Bob'
  res.send(`try <a href=${url}>${url}</a>`);
};
