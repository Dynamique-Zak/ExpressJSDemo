const express = require('express');
const articleService = require('./article-service');
const authMiddleware = require('../auth/auth-middleware');

const router = express.Router();

// Route pour créer un article (protégée par JWT)
router.post('/', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const response = articleService.createArticle(title, content);
  res.status(201).json(response);
});

// Route pour récupérer tous les articles (publique)
router.get('/', (req, res) => {
  const response = articleService.findAllArticles();
  res.json(response);
});

// Route pour récupérer un article par ID (publique)
router.get('/:id', (req, res) => {
  const response = articleService.findArticleById(parseInt(req.params.id));
  if (response.code === '2004') {
    return res.status(404).json(response);
  }
  res.json(response);
});

// Route pour mettre à jour un article par ID (protégée par JWT)
router.put('/:id', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const response = articleService.updateArticle(parseInt(req.params.id), title, content);
  if (response.code === '2004') {
    return res.status(404).json(response);
  }
  res.json(response);
});

// Route pour supprimer un article par ID (protégée par JWT)
router.delete('/:id', authMiddleware, (req, res) => {
  const response = articleService.deleteArticle(parseInt(req.params.id));
  if (response.code === '2004') {
    return res.status(404).json(response);
  }
  res.json(response);
});

module.exports = router;
