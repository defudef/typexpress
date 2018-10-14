import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IEntity } from '../common/IEntity';

export abstract class AbstractToken implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column({ name: 'user_id' })
  @IsUUID()
  @Exclude({ toPlainOnly: true })
  userId: string;

  @Column()
  token: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  isValid(): boolean {
    return ((new Date()) < this.expiresAt);
  }
}
