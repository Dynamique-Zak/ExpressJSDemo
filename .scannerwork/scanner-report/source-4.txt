let articles = [];
let nextId = 1;

class Article {
  constructor(title, content) {
    this.id = nextId++;
    this.title = title;
    this.content = content;
  }
}

exports.createArticle = (title, content) => {
  const article = new Article(title, content);
  articles.push(article);
  return article;
};

exports.findAllArticles = () => articles;

exports.findArticleById = (id) => articles.find(article => article.id === id);

exports.updateArticle = (id, title, content) => {
  const article = exports.findArticleById(id);
  if (article) {
    article.title = title || article.title;
    article.content = content || article.content;
  }
  return article;
};

exports.deleteArticle = (id) => {
  const index = articles.findIndex(article => article.id === id);
  return index !== -1 ? articles.splice(index, 1)[0] : null;
};
