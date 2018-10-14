import { hashSync } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import UserStatus from '../enums/UserStatus';
import { User } from './User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  createNewUser(firstName: string, email: string): Promise<User> {
    const user = this.create({
      firstName,
      email,
      status: UserStatus.INACTIVE
    });

    return this.save(user);
  }

  changePassword(user: User, newPassword: string): Promise<User> {
    user.password = hashSync(newPassword, 10);

    return this.save(user);
  }
}
