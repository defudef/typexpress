import { IgnoreProperty } from '../../validators/IgnoreProperty';
import { CRUDSchema } from './CRUDSchema';

export class StatusSchema extends CRUDSchema {
  @IgnoreProperty()
  status: any;
}
