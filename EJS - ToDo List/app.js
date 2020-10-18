const express = require('express');
const { getDate } = require('./date');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const items = [];
const workItems = [];

app.get('/', (req, res) => {
  const date = getDate();

  res.render('list', { listTitle: date, items: items });
});

app.post('/', (req, res) => {
  const newItem = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(newItem);
    res.redirect('/work');
  } else {
    items.push(newItem);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', items: workItems });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
