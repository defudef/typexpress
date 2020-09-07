import { IsActivationTokenValid } from '../../../validators/IsActivationTokenValid';

export class ActivationTokenSchema {
  @IsActivationTokenValid()
  token: string;
}
