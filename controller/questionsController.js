const Question = require('../models/questionsModel');

// Create a new question
exports.createQuestion = async (req, res) => {
  const { title, options } = req.body;

  try {
    const newQuestion = new Question({ title, options });
    await newQuestion.save();

    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin action: Grant access to a question
exports.updateAccess = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.accessible = true;
    await question.save();
    res.status(200).json({ message: 'Access granted to the question' });
  } catch (error) {
    console.error('Error granting access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin action: Grant access to a question
exports.updateQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByIdAndUpdate(questionId, req.body);

    res.status(200).json({ message: 'Question Update successfully' });
  } catch (error) {
    console.error('Error granting access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
