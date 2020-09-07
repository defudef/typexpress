import { Table } from 'typeorm';
import { createdAtColumn, pkUuidColumn, updatedAtColumn } from '../common/columns';

const userTable = () => {
  return new Table({
    name: 'user',
    columns: [
      pkUuidColumn(),
      {
        name: 'first_name',
        type: 'text'
      },
      {
        name: 'last_name',
        type: 'text',
        isNullable: true
      },
      {
        name: 'email',
        type: 'text'
      },
      {
        name: 'password',
        type: 'text',
        isNullable: true
      },
      {
        name: 'status',
        type: 'text'
      },
      createdAtColumn(),
      updatedAtColumn()
    ]
  });
};

export {
  userTable
};
