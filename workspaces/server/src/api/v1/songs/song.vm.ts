import { AutoMap } from '@automapper/classes';

import type { Song } from '@prisma/client';

import { PagyMetadataVM } from 'commons/metadata/PagyMetadataVM';
import { AuthorVM } from 'api/admin/authors/author.vm';
import { SingerVM } from 'api/admin/singers/singer.vm';
import { GenreVM } from 'api/admin/genres/genre.vm';

export class SongVM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  length: number;

  @AutoMap()
  view: number;

  @AutoMap()
  url: string;

  @AutoMap(() => [SingersSongVM])
  singersSongs: SingersSongVM[];

  @AutoMap(() => [AuthorsSongVM])
  authorsSongs: AuthorsSongVM[];

  @AutoMap(() => [GenresSongVM])
  genresSongs: GenresSongVM[];
}

export class SongWithAllAssociationVM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  length: number;

  @AutoMap()
  view: number;

  @AutoMap()
  url: string;

  @AutoMap(() => [SingerVM])
  singers: SingerVM[];

  @AutoMap(() => [AuthorVM])
  authors: AuthorVM[];

  @AutoMap(() => [GenreVM])
  genres: GenreVM[];
}

export class SongPaginationVM {
  @AutoMap(() => [SongVM])
  data: Song[];

  @AutoMap(() => PagyMetadataVM)
  metadata: PagyMetadataVM;
}

class GenresSongVM {
  id: number;

  @AutoMap()
  songId: number;

  @AutoMap()
  genreId: number;

  @AutoMap(() => GenreVM)
  genre: GenreVM;
}

class SingersSongVM {
  id: number;

  @AutoMap()
  singerId: number;

  @AutoMap()
  songId: number;

  @AutoMap(() => SingerVM)
  singer: SingerVM;
}

class AuthorsSongVM {
  id: number;

  @AutoMap()
  authorId: number;

  @AutoMap()
  songId: number;

  @AutoMap(() => AuthorVM)
  author: AuthorVM;
}
