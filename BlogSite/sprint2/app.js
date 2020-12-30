const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const {
  homeContent,
  aboutContent,
  contactContent,
} = require('./src/pageContent');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const serverUrl = 'mongodb://localhost:27017';
const dbName = 'blogsite';
const dbUrl = `${serverUrl}/${dbName}`;

mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('home', { homeContent, posts });
  });
});

app.get('/about', (req, res) => {
  res.render('about', { aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const { post_title, post_body } = req.body;
  const newPost = new Post({
    title: post_title,
    content: post_body,
  });

  newPost.save(() => {
    res.redirect('/');
  });
});

app.get('/posts/:postId', (req, res) => {
  const {
    params: { postId },
  } = req;

  Post.findOne({ _id: postId }, (err, { title, content }) => {
    res.render('post', { title, content });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
