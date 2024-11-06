const articleService = require('./article-service');
const articleModel = require('./article-model');

// Mock des méthodes du modèle d'article
jest.mock('./article-model');

describe('ArticleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createArticle', () => {
    it('should create an article and return success response', () => {
      const title = 'Test Article';
      const content = 'Test Content';
      const mockArticle = { id: 1, title, content };

      articleModel.createArticle.mockReturnValue(mockArticle);

      const response = articleService.createArticle(title, content);

      expect(response.code).toBe('2001');
      expect(response.message).toBe('Article créé avec succès');
      expect(response.data).toEqual(mockArticle);
      expect(articleModel.createArticle).toHaveBeenCalledWith(title, content);
    });
  });

  describe('findAllArticles', () => {
    it('should return all articles', () => {
      const mockArticles = [
        { id: 1, title: 'Article 1', content: 'Content 1' },
        { id: 2, title: 'Article 2', content: 'Content 2' },
      ];

      articleModel.findAllArticles.mockReturnValue(mockArticles);

      const response = articleService.findAllArticles();

      expect(response.code).toBe('2002');
      expect(response.message).toBe('Liste des articles récupérée avec succès');
      expect(response.data).toEqual(mockArticles);
    });
  });

  describe('findArticleById', () => {
    it('should return an article by ID', () => {
      const mockArticle = { id: 1, title: 'Test Article', content: 'Test Content' };

      articleModel.findArticleById.mockReturnValue(mockArticle);

      const response = articleService.findArticleById(1);

      expect(response.code).toBe('2003');
      expect(response.message).toBe('Article récupéré avec succès');
      expect(response.data).toEqual(mockArticle);
      expect(articleModel.findArticleById).toHaveBeenCalledWith(1);
    });

    it('should return error response if article not found', () => {
      articleModel.findArticleById.mockReturnValue(null);

      const response = articleService.findArticleById(999);

      expect(response.code).toBe('2004');
      expect(response.message).toBe('Article non trouvé');
      expect(response.data).toBeNull();
    });
  });

  describe('updateArticle', () => {
    it('should update an article and return success response', () => {
      const title = 'Updated Title';
      const content = 'Updated Content';
      const mockArticle = { id: 1, title, content };

      articleModel.updateArticle.mockReturnValue(mockArticle);

      const response = articleService.updateArticle(1, title, content);

      expect(response.code).toBe('2005');
      expect(response.message).toBe('Article mis à jour avec succès');
      expect(response.data).toEqual(mockArticle);
      expect(articleModel.updateArticle).toHaveBeenCalledWith(1, title, content);
    });

    it('should return error response if article to update not found', () => {
      articleModel.updateArticle.mockReturnValue(null);

      const response = articleService.updateArticle(999, 'New Title', 'New Content');

      expect(response.code).toBe('2004');
      expect(response.message).toBe('Article non trouvé pour la mise à jour');
      expect(response.data).toBeNull();
    });
  });

  describe('deleteArticle', () => {
    it('should delete an article and return success response', () => {
      const mockArticle = { id: 1, title: 'Test Article', content: 'Test Content' };

      articleModel.deleteArticle.mockReturnValue(mockArticle);

      const response = articleService.deleteArticle(1);

      expect(response.code).toBe('2006');
      expect(response.message).toBe('Article supprimé avec succès');
      expect(response.data).toBeNull();
      expect(articleModel.deleteArticle).toHaveBeenCalledWith(1);
    });

    it('should return error response if article to delete not found', () => {
      articleModel.deleteArticle.mockReturnValue(null);

      const response = articleService.deleteArticle(999);

      expect(response.code).toBe('2004');
      expect(response.message).toBe('Article non trouvé pour la suppression');
      expect(response.data).toBeNull();
    });
  });
});
