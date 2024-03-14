const express = require('express');
const {
  createQuestion,
  updateAccess,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
} = require('../controller/questionsController');
const router = express.Router();

router.post('/create-question', createQuestion);
router.put('/update-question/:questionId', updateQuestion);
router.put('/grant-access/:questionId', updateAccess);
router.get('/questions', getAllQuestions);
router.get('/questions/:questionId', getQuestionById);

module.exports = router;
