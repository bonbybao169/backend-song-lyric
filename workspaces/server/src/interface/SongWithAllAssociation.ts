import type {
  Author,
  AuthorsSong,
  Genre,
  GenresSong,
  Singer,
  SingersSong,
  Song,
} from '@prisma/client';

interface ISingersSongWithSinger extends SingersSong {
  singer: Singer;
}

interface IAuthorsSongWithAuthor extends AuthorsSong {
  author: Author;
}

interface IGenresSongWithGenre extends GenresSong {
  genre: Genre;
}

export interface ISongWithAllAssociation extends Song {
  singersSongs: ISingersSongWithSinger[];
  authorsSongs: IAuthorsSongWithAuthor[];
  genresSongs: IGenresSongWithGenre[];
}
