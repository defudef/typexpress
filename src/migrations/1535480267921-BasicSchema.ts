import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  accessTokenTable,
  activationTokenTable,
  refreshTokenTable,
  resetPasswordTokenTable
} from './tables/TokenTable';
import { userTable } from './tables/UserTable';

export class BasicSchema1535480267921 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(userTable());

    await queryRunner.createTable(accessTokenTable());
    await queryRunner.createTable(activationTokenTable());
    await queryRunner.createTable(refreshTokenTable());
    await queryRunner.createTable(resetPasswordTokenTable());
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('reset_password_token');
    await queryRunner.dropTable('refresh_token');
    await queryRunner.dropTable('activation_token');
    await queryRunner.dropTable('access_token');

    await queryRunner.dropTable('user');
  }
}
