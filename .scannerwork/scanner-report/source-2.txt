const express = require('express');
const authController = require('./auth/auth-controller');
const articleController = require('./article/article-controller');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/auth', authController);
app.use('/articles', articleController);

module.exports = app;
