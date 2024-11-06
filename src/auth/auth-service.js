const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { createResponse } = require('../helpers/response-helper');

exports.generateToken = (user) => {
  const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
  return createResponse('1001', 'Token généré avec succès', { accessToken: token });
};

exports.validateUser = async (username, password, mockUser) => {
  const isValid = username === mockUser.username && password === mockUser.password;
  if (isValid) {
    return createResponse('1002', 'Utilisateur validé avec succès', { username });
  }
  return createResponse('1003', 'Échec de la validation de l’utilisateur');
};
