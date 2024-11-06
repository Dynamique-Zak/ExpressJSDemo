const authService = require('./auth-service');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

jest.mock('jsonwebtoken');

describe('AuthService', () => {
  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const mockUser = { id: 1, username: 'testuser' };
      const mockToken = 'mockToken';
      
      jwt.sign.mockReturnValue(mockToken);

      const response = authService.generateToken(mockUser);

      expect(response.code).toBe('1001');
      expect(response.message).toBe('Token généré avec succès');
      expect(response.data).toEqual({ accessToken: mockToken });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id, username: mockUser.username },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );
    });
  });

  describe('validateUser', () => {
    it('should validate user with correct username and password', async () => {
      const username = 'testuser';
      const password = 'password';
      const mockUser = { id: 1, username, password: "password" };

      const response = await authService.validateUser(username, password, mockUser);

      expect(response.code).toBe('1002');
      expect(response.message).toBe('Utilisateur validé avec succès');
      expect(response.data).toEqual({ username });
    });

    it('should return error response for invalid credentials', async () => {
      const username = 'testuser';
      const password = 'wrongpassword';
      const mockUser = { id: 1, username, password: "password" };

      const response = await authService.validateUser(username, password, mockUser);

      expect(response.code).toBe('1003');
      expect(response.message).toBe('Échec de la validation de l’utilisateur');
    });
  });
});
