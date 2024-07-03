import jwt from 'jsonwebtoken';
const secret = process.env.SECRET_KEY; // Substitua por um segredo forte em produção

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret, { expiresIn: '365d' });
  }

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acesso negado' });
  
    try {
      const verified = jwt.verify(token, secret);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token inválido' });
    }
  };
  
  // Middleware para verificar se o usuário é admin
  const authorizeAdmin = (req, res, next) => {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };


  export { generateToken, authenticateToken, authorizeAdmin };