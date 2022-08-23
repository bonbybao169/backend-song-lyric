import type { Author, Singer, Genre, Song, User } from '@prisma/client';

import type { IPagination, IToken } from 'interface';

export interface IDataWithMetadata {
  data: Author[] | Singer[] | Genre[] | Song[] | User;
  metadata: IPagination | IToken;
}
