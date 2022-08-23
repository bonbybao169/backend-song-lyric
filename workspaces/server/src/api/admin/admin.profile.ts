import { createMap, forMember, mapFrom, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import type { Mapper } from '@automapper/core';

import {
  SongVM,
  SongWithAllAssociationVM,
  SongPaginationVM,
} from 'api/admin/songs/song.vm';
import { GenreVM, GenrePaginationVM } from 'api/admin/genres/genre.vm';
import { SingerVM, SingerPaginationVM } from 'api/admin/singers/singer.vm';
import { StringVM } from 'commons/StringVM';

import { AuthorVM, AuthorPaginationVM } from './authors/author.vm';

@Injectable()
export class AdminProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StringVM, StringVM);
      createMap(mapper, AuthorVM, AuthorVM);
      createMap(
        mapper,
        AuthorPaginationVM,
        AuthorPaginationVM,
        forMember(
          (des) => {
            return des.data;
          },
          mapWith(AuthorVM, AuthorVM, (source) => {
            return source.data;
          }),
        ),
      );

      createMap(mapper, StringVM, StringVM);
      createMap(mapper, GenreVM, GenreVM);
      createMap(
        mapper,
        GenrePaginationVM,
        GenrePaginationVM,
        forMember(
          (des) => {
            return des.data;
          },
          mapWith(GenreVM, GenreVM, (source) => {
            return source.data;
          }),
        ),
      );

      createMap(mapper, StringVM, StringVM);
      createMap(mapper, SingerVM, SingerVM);
      createMap(
        mapper,
        SingerPaginationVM,
        SingerPaginationVM,
        forMember(
          (des) => {
            return des.data;
          },
          mapWith(SingerVM, SingerVM, (source) => {
            return source.data;
          }),
        ),
      );

      createMap(mapper, StringVM, StringVM);
      createMap(mapper, SongVM, SongVM);
      createMap(
        mapper,
        SongVM,
        SongWithAllAssociationVM,
        forMember(
          (des) => des.singers,
          mapFrom((source) =>
            source.singersSongs.map((singerSong) => singerSong.singer),
          ),
        ),
        forMember(
          (des) => des.authors,
          mapFrom((source) =>
            source.authorsSongs.map((authorSong) => authorSong.author),
          ),
        ),
        forMember(
          (des) => des.genres,
          mapFrom((source) =>
            source.genresSongs.map((genreSong) => genreSong.genre),
          ),
        ),
      );
      createMap(
        mapper,
        SongPaginationVM,
        SongPaginationVM,
        forMember(
          (des) => {
            return des.data;
          },
          mapWith(SongVM, SongVM, (source) => {
            return source.data;
          }),
        ),
      );
    };
  }
}
