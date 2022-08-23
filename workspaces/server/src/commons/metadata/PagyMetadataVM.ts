import { AutoMap } from '@automapper/classes';

export class PagyMetadataVM {
  @AutoMap()
  totalRecord: number;

  @AutoMap()
  currentPage: number;

  @AutoMap()
  recordsPerPage: number;
}
