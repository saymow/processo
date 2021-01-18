import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppError, ERRORS } from "../errors";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";

class UserController {
  async store(req: Request, res: Response) {
    const createUserService = new CreateUserService();
    const data = req.body;

    const user = await createUserService.execute(data);

    return res.status(201).send(user);
  }

  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return res.send(users);
  }

  async show(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const id = req.params.id;

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(ERRORS.USER_NOT_FOUND);

    return res.send(user);
  }

  async destroy(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const id = req.params.id;

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(ERRORS.USER_NOT_FOUND);

    await usersRepository.delete(id);

    return res.send();
  }

  async update(req: Request, res: Response) {
    const createUserService = new UpdateUserService();
    const id = req.params.id;
    const data = req.body;

    const user = await createUserService.execute(id, data);

    return res.send(user);
  }
}

export default UserController;
