const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    accessible: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
