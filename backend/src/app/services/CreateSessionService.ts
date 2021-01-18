import { getRepository } from "typeorm";
import argon2 from "argon2";
import * as Yup from "yup";
import User from "../models/User";
import { AppError, ERRORS } from "../errors";

const schema = Yup.object().shape({
  username: Yup.string().required().min(3).max(32),
  password: Yup.string().required().min(3).max(32),
  //   .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g),
});

class CreateSessionService {
  async execute(userData: any) {
    const usersRepository = getRepository(User);

    await schema.validate(userData, {
      abortEarly: false,
    });

    const user = await usersRepository.findOne({ username: userData.username });

    if (!user) throw new AppError(ERRORS.USER_NOT_FOUND);

    if (!(await argon2.verify(user.password, userData.password)))
      throw new AppError(ERRORS.USER_INVALID_CREDENTIALS);

    return user;
  }
}

export default CreateSessionService;
