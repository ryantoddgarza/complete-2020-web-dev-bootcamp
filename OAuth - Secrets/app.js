require('dotenv').config();

const express = require('express'),
  app = express();
const mongoose = require('mongoose'),
  { Schema } = mongoose;
const findOrCreate = require('mongoose-findorcreate');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/userDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/secrets');
  }
);

app.get('/secrets', (req, res) => {
  User.find({ secret: { $ne: null } }, (err, users) => {
    if (err) {
      console.log(err);
    }

    res.render('secrets', { users });
  });
});

app
  .route('/submit')
  .get((req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }

    res.render('submit');
  })
  .post((req, res) => {
    const {
      user: { id },
      body: { secret },
    } = req;

    User.findById(id, (err, user) => {
      if (err) {
        console.log(err);
      }

      if (!user) {
        res.json('no user with id exists');
      }

      user.secret = secret;
      user.save(() => {
        res.redirect('/secrets');
      });
    });
  });

app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    const { username, password } = req.body;

    User.register({ username }, password, (error, user) => {
      if (error) {
        console.log(error);
        res.redirect('/register');
      }

      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    });
  });

app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    req.login(user, (error) => {
      if (error) {
        console.log(error);
        res.redirect('/login');
      }

      passport.authenticate('local')(req, res, () => {
        res.redirect('/secrets');
      });
    });
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
