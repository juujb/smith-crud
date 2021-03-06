import { Request, Response } from 'express';
import User from '../models/User';
import Status from '../enums/status';
import { UserId } from '../interfaces/user';

const loginValidation = async (req: Request, res: Response, next: () => void) => {
  const { username, password } = req.body;
  const user: UserId = await User.findLogin({ username, password });

  if (!user) {
    return res.status(Status.UNAUTHORIZED).json({ error: 'Username or password invalid' });
  }

  req.body = user;
  next();
};

export default loginValidation;