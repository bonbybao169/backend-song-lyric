import { AutoMap } from '@automapper/classes';

import { TokenMetadataVM } from 'commons/metadata/TokenMetadataVM';

export class UserVM {
  id: number;

  @AutoMap()
  email: string;

  @AutoMap()
  role: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  numberOfUploads: number;
}

export class UserWithTokenVM {
  @AutoMap(() => UserVM)
  data: UserVM;

  @AutoMap(() => TokenMetadataVM)
  metadata: TokenMetadataVM;
}
