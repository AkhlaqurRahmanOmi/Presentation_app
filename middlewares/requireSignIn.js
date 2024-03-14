const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

exports.requireSignIn = async (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (!authToken) return res.status(400).json({ error: 'Please Log In' });
  const bearer = authToken.split(' ');
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(400).json({ error: 'Please Log In' });
    }
    if (decoded) {
      const user = await User.findOne({ _id: decoded?._id }).select([
        'name',
        'email',
        'role',
      ]);
      if (!user)
        return res.status(400).json({ error: 'User not found. Please Log In' });
      req.user = user;
      next();
    }
  });
};
