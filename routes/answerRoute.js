const express = require('express');
const router = express.Router();
const { submitAnswer } = require('../controller/answerController');

router.post('/submit-answer', submitAnswer);

module.exports = router;
