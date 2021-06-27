/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ error: 'Token missing' });

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, '69fc81f5a7a7fc79caa271f8f1177e07') as IPayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
