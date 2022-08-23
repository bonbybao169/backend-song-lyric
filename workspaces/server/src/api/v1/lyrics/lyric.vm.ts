import { AutoMap } from '@automapper/classes';

export class LyricVM {
  @AutoMap()
  id: number;

  @AutoMap()
  songId: number;

  @AutoMap()
  languageCode: string;

  @AutoMap()
  content: string;

  @AutoMap()
  translatorId: number;

  @AutoMap()
  default: boolean;

  @AutoMap()
  status: string;
}
