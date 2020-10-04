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

app.get('/bmi', (req, res) => {
  res.sendFile(`${__dirname}/bmi.html`);
});

app.post('/bmi', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);

  const bmiCalculator = (w, h) => {
    let bmi = Math.round(w / Math.pow(h, 2));

    if (bmi < 18.5) {
      return `Your BMI is ${bmi}, so you are underweight.`;
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      return `Your BMI is ${bmi}, so you have a normal weight.`;
    }
    if (bmi > 24.9) {
      return `Your BMI is ${bmi}, so you are overweight.`;
    }
  };

  const result = bmiCalculator(weight, height);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
