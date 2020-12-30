require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbName = 'todolist';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PWD;
const dbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rwyu4.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const itemsSchema = {
  name: String,
};
const Item = mongoose.model('Item', itemsSchema);
const item1 = new Item({ name: 'Welcome to your todo list!' });
const item2 = new Item({ name: 'Tap the plus button to add a new item.' });
const item3 = new Item({ name: 'Check to delete an item.' });
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model('List', listSchema);
const defaultListName = 'Today';

app.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
      return;
    }

    const isEmpty = items.length === 0;
    if (isEmpty) {
      Item.insertMany(defaultItems, (e) => {
        if (e) {
          console.log(e);
          return;
        }

        console.log('Successfully saved default items to database');
      });

      res.redirect('/');
      return;
    }

    res.render('list', { listTitle: defaultListName, items });
  });
});

app.get('/:listName', (req, res) => {
  const { params: { listName } } = req;
  const formattedListName = listName.trim().toLowerCase();
  const filter = { name: listName };

  List.findOne(filter, (err, list) => {
    if (err) {
      console.log(err);
      return;
    }

    if (!list) {
      const newList = new List({
        name: formattedListName,
        items: defaultItems,
      });

      newList.save();
      res.redirect(`/${formattedListName}`);
      return;
    }

    res.render('list', { listTitle: list.name, items: list.items });
  });
});

app.post('/', (req, res) => {
  const newItemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: newItemName,
  });

  if (listName !== defaultListName) {
    const filter = { name: listName };

    List.findOne(filter, (err, list) => {
      if (err) {
        console.log(err);
        return;
      }

      list.items.push(newItem);
      list.save();
      res.redirect(`/${listName}`);
    });
    return;
  }

  newItem.save();
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const itemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName !== defaultListName) {
    const filter = { name: listName };
    const update = { $pull: { items: { _id: itemId } } };

    List.findOneAndUpdate(filter, update, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      res.redirect(`/${listName}`);
    });
    return;
  }

  Item.findByIdAndRemove(itemId, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  res.redirect('/');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
