import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const user = this.usersRepository.findByEmail(email);

    if (user) {
      throw new Error(`User email ${email} already exists`);
    }

    const create = this.usersRepository.create({ name, email });

    return create;
  }
}

export { CreateUserUseCase };
