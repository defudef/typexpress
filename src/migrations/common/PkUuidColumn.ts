import { TableColumn } from 'typeorm';

export default () => {
  return new TableColumn({
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'uuid'
  });
};
