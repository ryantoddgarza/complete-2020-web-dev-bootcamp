// JS Variables
// Given the existing code, can you write some code so that their values are switched around?

function test() {
  var a = '3';
  var b = '8';
  // Do not change the code above

  var c = a;
  a = b;
  b = c;

  // Do not change the code below
  console.log('a is ' + a);
  console.log('b is ' + b);
}

// Life In Weeks
// Create a function that tells us how many days, weeks and months we have left if we live until 90 years old.
// It will take your current age as the input and console.logs a message with our time left in this format:
// `You have x days, y weeks, and z months left.`

function lifeInWeeks(age) {
  // Do not change the code above

  let lifespan = 90;
  let days = (lifespan - age) * 365;
  let weeks = (lifespan - age) * 52;
  let months = (lifespan - age) * 12;

  console.log(
    `You have ${days} days, ${weeks} weeks, and ${months} months left.`
  );

  // Do not change the code below
}

// BMI Calculator
// Create a BMI calculator using JavaScript functions.
// The first parameter should be the weight and the second should be the height.

function bmiCalculator(weight, height) {
  return Math.round(weight / Math.pow(height, 2));
}

// BMI Calculator Advanced (if/else)
// Write a function that outputs (returns) a different message depending on the BMI.

function bmiCalculator(weight, height) {
  let bmi = Math.round(weight / Math.pow(height, 2));

  if (bmi < 18.5) {
    return `Your BMI is ${bmi}, so you are underweight.`;
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return `Your BMI is ${bmi}, so you have a normal weight.`;
  }
  if (bmi > 24.9) {
    return `Your BMI is ${bmi}, so you are overweight.`;
  }
}

// Who's Buying Lunch
// You are going to write a function which will select a random name from a list of names.

function whosPaying(names) {
  // Do not change the code above

  let randomIndex = Math.floor(Math.random() * names.length);
  let person = names[randomIndex];

  return person + ' is going to buy lunch today!';

  // Do not change the code below
}

// Finbonacci Generator
// Create a function where every number is the sum of the two previous ones.
// The first two numbers in the array must be 0 and 1.

function fibonacciGenerator(n) {
  // Do not change the code above

  let output = [];

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      output.push(0);
    } else if (i === 1) {
      output.push(1);
    } else {
      output.push(output[output.length - 1] + output[output.length - 2]);
    }
  }

  return output;

  // Do not change the code below
}
