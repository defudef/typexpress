import { compareSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { IEntity } from '../common/IEntity';
import { ITimestampable } from '../common/ITimestampable';
import { Timestampable } from '../common/Timestampable';
import UserStatus from '../enums/UserStatus';
import { IUser } from './IUser';

@Entity('user')
@Unique(['email'])
export class User extends Timestampable implements IEntity, ITimestampable, IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  @MinLength(3)
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  setStatus(status: UserStatus) {
    this.status = status;
  }

  validatePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
