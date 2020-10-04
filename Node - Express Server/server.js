const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/contact', (req, res) => {
  const EMAIL = 'ryantoddgarza@gmail.com';
  res.send(`<a href="mailto:${EMAIL}">${EMAIL}</a>`);
});

app.get('/about', (req, res) => {
  res.send(
    `I'm passionate about patterns. Ever since I was young they have infatuated me, so it makes perfect sense that I began making music at the age of four. Realizing that simple rules can combine to create infinite complexity keeps me engaged in a lifetime of pattern manipulation.`
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
