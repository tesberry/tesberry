import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));

// Fake endpoint for Tesla online check
// Original endpoint: http://connman.vn.tesla.services/online/status.html
app.get('/online/status.html', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log(`Tesberry UI running on port ${port}`);
});