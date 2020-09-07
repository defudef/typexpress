import { IgnoreProperty } from '../../validators/IgnoreProperty';

export class CRUDSchema {
  @IgnoreProperty()
  id: any;

  @IgnoreProperty()
  createdAt: any;

  @IgnoreProperty()
  updatedAt: any;
}
