const Answer = require('../models/answerModel');

// Submit an answer
exports.submitAnswer = async (req, res) => {
  const { userId, questionId, answer } = req.body;

  try {
    // If no answer exists, create a new one
    const newAnswer = new Answer({ userId, questionId, answer });
    await newAnswer.save();

    res.status(201).json({ message: 'Answer submitted successfully' });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
