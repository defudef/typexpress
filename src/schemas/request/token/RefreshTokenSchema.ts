import { IsRefreshTokenValid } from '../../../validators/IsRefreshTokenValid';

export class RefreshTokenSchema {
  @IsRefreshTokenValid()
  token: string;
}
