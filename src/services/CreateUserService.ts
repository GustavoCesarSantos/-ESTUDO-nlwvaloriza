/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean
}

class CreateUserService {
  async execute({
    name,
    email,
    password,
    admin = false,
  }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) throw new Error('Not passed e-mail');

    const userAlreadyExists = await usersRepositories.findOne({
      email,
    });

    if (userAlreadyExists) throw new Error('User already exists');

    const passwordHash = await hash(password, 8);

    const user = usersRepositories.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };
