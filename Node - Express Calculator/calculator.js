const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
  const num1 = Number(req.body.n1);
  const num2 = Number(req.body.n2);

  const result = num1 + num2;

  res.send(`The result of the calculation is ${result}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
