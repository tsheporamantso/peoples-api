const express = require('express');
const router = require('./routes/people');

const app = express();

app.use(express.json());

app.use('/api/people', router);

app.all('*', (req, res) => {
  res.status(404).json({ success: false, msg: 'Page not found' });
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Server is listening on port 3000...');
  }
});
