const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'fruits';

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true });

// Schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No name specified. Please check your data entry.'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// Model
const Fruit = mongoose.model('fruit', fruitSchema);

// Document
const apple = new Fruit({
  name: 'Apple',
  rating: 8,
  review: 'Great fruit!',
});

// Inserting one
// apple.save();

// Inserting many
//

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 10,
  review: 'The best fruit!',
});

const orange = new Fruit({
  name: 'Orange',
  rating: 6,
  review: 'Kinda sour.',
});

const banana = new Fruit({
  name: 'Banana',
  rating: 9,
  review: 'Yum!',
});

function insertNewFruits() {
  Fruit.insertMany([kiwi, orange, banana], (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`Successfully saved all the fruits to ${dbName}`);
  });
}

// insertNewFruits();

// New person schema, model, & document
//

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model('person', personSchema);

const john = new Person({
  name: 'John',
  age: 37,
});

// john.save();

// Embedding a document. `banana` as a value
// establishes a relationship with the fruits db
const amy = new Person({
  name: 'Amy',
  age: 23,
  favoriteFruit: banana,
});

// amy.save();

// Updating one
//

function updateOrange() {
  Fruit.updateOne({ name: 'Orange' }, { rating: 7 }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Successfully updated the document.');
  });
}

// updateOrange();

const mango = new Fruit({
  name: 'Mango',
  rating: 9,
  review: 'Tropical.',
});

// mango.save();

function johnLikesMango() {
  // Updating and adding a relationship
  Person.updateOne({ name: 'John' }, { favoriteFruit: mango }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Successfully updated the document.');
  });
}

// johnLikesMango();

// Finding
//

function findAllNames() {
  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    }

    fruits.forEach((fruit) => console.log(fruit.name));

    mongoose.connection.close();
  });
}

findAllNames();

// Deleting one
//

const peach = new Fruit({
  name: 'Peach',
});

// peach.save();

function deletePeach() {
  Fruit.deleteOne({ name: 'Peach' }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Successfully deleted the document.');
  });
}

// deletePeach();

// Deleting many
//

function deletePeople() {
  Person.deleteMany({ name: 'John' }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Successfully deleted all specified documents.');
  });
}

// deletePeople();
