import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../constants";
import CreateSessionService from "../services/CreateSessionService";

class SessionController {
  async store(req: Request, res: Response) {
    const createSessionService = new CreateSessionService();

    const userData = req.body;

    const user = await createSessionService.execute(userData);
    const jwtToken = SessionController.createToken({
      id: user.id,
      role: user.role,
    });

    return res.send({
      id: user.id,
      role: user.role,
      token: jwtToken,
    });
  }

  async connect(req: Request, res: Response) {
    return res.send((req as any).user);
  }

  static createToken(params = {}, secret = JWT_TOKEN_SECRET) {
    return jwt.sign(params, secret, {
      expiresIn: "1d",
    });
  }
}

export default SessionController;
