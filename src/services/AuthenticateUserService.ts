import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) throw new Error('E-mail or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('E-mail or password incorrect');

    const token = sign({ email: user.email }, '69fc81f5a7a7fc79caa271f8f1177e07', {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
