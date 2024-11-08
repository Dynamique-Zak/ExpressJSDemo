const articleModel = require('./article-model');
const { createResponse } = require('../helpers/response-helper');

exports.createArticle = (title, content) => {
  const article = articleModel.createArticle(title, content);
  return createResponse('2001', 'Article créé avec succès', article);
};

exports.findAllArticles = () => {
  const articles = articleModel.findAllArticles();
  return createResponse('2002', 'Liste des articles récupérée avec succès', articles);
};

exports.findArticleById = (id) => {
  const article = articleModel.findArticleById(id);
  if (article) {
    return createResponse('2003', 'Article récupéré avec succès', article);
  }
  return createResponse('2004', 'Article non trouvé');
};

exports.updateArticle = (id, title, content) => {
  const article = articleModel.updateArticle(id, title, content);
  if (article) {
    return createResponse('2005', 'Article mis à jour avec succès', article);
  }
  return createResponse('2004', 'Article non trouvé pour la mise à jour');
};

exports.deleteArticle = (id) => {
  const article = articleModel.deleteArticle(id);
  if (article) {
    return createResponse('2006', 'Article supprimé avec succès');
  }
  return createResponse('2004', 'Article non trouvé pour la suppression');
};
