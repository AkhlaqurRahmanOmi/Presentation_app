const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
