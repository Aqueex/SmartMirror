const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/update', (req, res) => {
  res.redirect('/');
});

module.exports = router;
