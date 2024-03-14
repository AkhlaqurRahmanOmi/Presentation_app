const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels'); // Import your User model here

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user with the given email already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: 'Email already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    const userWithoutPassword = await User.findById(newUser._id).select(
      '-password'
    );

    // Respond with token and user information
    res.status(200).json({ token, userWithoutPassword });
  } catch (error) {
    // Handle any errors that occurred during signup
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  //email and password match
  const result = await bcrypt.compare(password, user?.password);
  if (!result) {
    return res.status(400).json({ error: "Email and password don't match!" });
  }

  //carete token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const userWithoutPassword = await User.findById(user._id).select('-password');
  res.status(200).json({ token, userWithoutPassword });
};
