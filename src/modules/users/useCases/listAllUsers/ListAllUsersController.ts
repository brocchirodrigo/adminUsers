import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });
      console.log(users);
      return response.status(200).json(users);
    } catch (err) {
      return response.status(400).json({ error: "User unauthorized." });
    }
  }
}

export { ListAllUsersController };
