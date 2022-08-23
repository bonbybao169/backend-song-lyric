import { AutoMap } from '@automapper/classes';

import { PagyMetadataVM } from 'commons/metadata/PagyMetadataVM';

export class SingerVM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  dateOfBirth: Date;

  @AutoMap()
  numberOfSongs: number;
}

export class SingerPaginationVM {
  @AutoMap(() => [SingerVM])
  data: SingerVM[];

  @AutoMap(() => PagyMetadataVM)
  metadata: PagyMetadataVM;
}
