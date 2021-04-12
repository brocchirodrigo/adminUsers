import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, { name, email });

    this.users.push(user);

    return user;
  }

  findById(id: string): User {
    const user = this.users.find((userId) => userId.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((userEmail) => userEmail.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => receivedUser.id === user.id
    );

    const updateAdmin = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users[userIndex] = updateAdmin;

    return updateAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
