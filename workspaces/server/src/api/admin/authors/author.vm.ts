import { AutoMap } from '@automapper/classes';

import { PagyMetadataVM } from 'commons/metadata/PagyMetadataVM';

export class AuthorVM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  dateOfBirth: Date;

  @AutoMap()
  numberOfSongs: number;
}

export class AuthorPaginationVM {
  @AutoMap(() => [AuthorVM])
  data: AuthorVM[];

  @AutoMap(() => PagyMetadataVM)
  metadata: PagyMetadataVM;
}
