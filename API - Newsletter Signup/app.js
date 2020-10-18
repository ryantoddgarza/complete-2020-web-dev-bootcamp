const express = require('express');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.get('/success', (req, res) => {
  res.sendFile(`${__dirname}/success.html`);
});

app.get('/failure', (req, res) => {
  res.sendFile(`${__dirname}/failure.html`);
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const listId = process.env.MAILCHIMP_LIST_ID;
  const url = `https://us4.api.mailchimp.com/3.0/lists${listId}`;
  const apiKey = process.env.MAILCHIMP_KEY;
  const options = {
    method: 'POST',
    auth: `ryan123:${apiKey}`,
  };
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }

    response.on('data', (data) => {
      console.log(data);
    });
  });

  request.write(jsonData);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000');
});
