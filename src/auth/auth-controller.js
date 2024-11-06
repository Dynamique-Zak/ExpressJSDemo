const express = require('express');
const bcrypt = require('bcryptjs');
const authService = require('./auth-service');

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const mockUser = { id: 1, username: 'user', password: "password" };

  const validationResponse = await authService.validateUser(username, password, mockUser);
  if (validationResponse.code !== '1002') {
    return res.status(401).json(validationResponse);
  }

  const tokenResponse = authService.generateToken(mockUser);
  res.json(tokenResponse);
});

module.exports = router;
