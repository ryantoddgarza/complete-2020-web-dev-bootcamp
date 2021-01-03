const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const serverUrl = 'mongodb://localhost:27017';
const dbName = 'wiki';
const dbUrl = `${serverUrl}/${dbName}`;

mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

router.get('/', (req, res) => {
  res.send('wiki');
});

const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model('Article', articleSchema);

router
  .route('/articles')
  .get((req, res) => {
    Article.find({}, (err, doc) => {
      if (err) {
        console.log(err.message);
        res.json(err);
        return;
      }

      res.json(doc);
    });
  })
  .post((req, res) => {
    const data = {
      title: req.body.title,
      content: req.body.content,
    };

    const newArticle = new Article(data);
    newArticle.save((err) => {
      if (err) {
        console.log(err.message);
        res.json(err);
        return;
      }

      res.json({ success: true, message: 'Article saved' });
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err, doc) => {
      if (err) {
        console.log(err.message);
        res.json(err);
        return;
      }

      res.json({ success: true, message: 'All articles delted' });
    });
  });

router
  .route('/articles/:title')
  .get((req, res) => {
    Article.findOne({ title: req.params.title }, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json(err);
        return;
      }

      if (!data) {
        res.json({ success: false, message: 'No article found' });
        return;
      }

      res.json(data);
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.title },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err, data) => {
        if (err) {
          console.log(err.message);
          res.json(err);
          return;
        }

        res.json(data);
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { $set: req.body },
      { overwrite: true },
      (err, data) => {
        if (err) {
          console.log(err.message);
          res.json(err);
          return;
        }

        res.json(data);
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.title }, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json(err);
        return;
      }

      res.json(data);
    });
  });

module.exports = router;
