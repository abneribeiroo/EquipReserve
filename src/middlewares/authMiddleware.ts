import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request type to include userId
interface CustomRequest extends Request {
  userId?: string;
}

const createAuthMiddleware = () => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token missing' });

    jwt.verify(token, process.env.SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Token invalid', error: err });
      req.userId = decoded.userId;
      next();
    });
  };
};

export default createAuthMiddleware();