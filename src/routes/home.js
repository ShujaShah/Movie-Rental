const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('It works like a charm');
});

module.exports = router;
