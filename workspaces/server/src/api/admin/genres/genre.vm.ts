import { AutoMap } from '@automapper/classes';

import { PagyMetadataVM } from 'commons/metadata/PagyMetadataVM';

export class GenreVM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  numberOfSongs: number;
}

export class GenrePaginationVM {
  @AutoMap(() => [GenreVM])
  data: GenreVM[];

  @AutoMap(() => PagyMetadataVM)
  metadata: PagyMetadataVM;
}
