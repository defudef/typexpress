import { Table } from 'typeorm';
import { createdAtColumn, pkUuidColumn } from '../common/columns';

const getTokenColumns = () => {
  return [
    pkUuidColumn(),
    {
      name: 'user_id',
      type: 'uuid',
      isNullable: false
    },
    {
      name: 'token',
      type: 'uuid',
      isNullable: false
    },
    {
      name: 'expires_at',
      type: 'timestamptz',
      isNullable: false
    },
    createdAtColumn()
  ];
};

const activationTokenTable = () => {
  return new Table({
    name: 'activation_token',
    columns: getTokenColumns()
  });
};

const accessTokenTable = () => {
  return new Table({
    name: 'access_token',
    columns: getTokenColumns()
  });
};

const refreshTokenTable = () => {
  return new Table({
    name: 'refresh_token',
    columns: getTokenColumns()
  });
};

const resetPasswordTokenTable = () => {
  return new Table({
    name: 'reset_password_token',
    columns: getTokenColumns()
  });
};

export {
  activationTokenTable,
  accessTokenTable,
  refreshTokenTable,
  resetPasswordTokenTable
};
