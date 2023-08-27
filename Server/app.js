const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const jsonFilePath = path.join(__dirname, 'data', 'database.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/okey', (req, res) => {
  res.render('okey');
});
app.post('/update', (req, res) => {
  const newData = req.body.newData;

  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  jsonData.updatedField = newData;

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));

  res.redirect('/okey');
});
app.get('/api/json', (req, res) => {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const veri = JSON.parse(jsonData);
  res.json(veri);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
