import { AutoMap } from '@automapper/classes';

export class TokenMetadataVM {
  @AutoMap()
  accessToken: string;

  @AutoMap()
  refreshToken: string;
}
