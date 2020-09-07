import { ValidationOptions } from 'class-validator';
import { ObjectType } from 'typeorm';
import { IEntity } from '../../models/common/IEntity';

export interface IsUniqueOptions extends ValidationOptions {
  repository: ObjectType<IEntity>;
}
