import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { EXISTED_GENRE } from './constants';

export class GenreExistedException extends BaseException {
  constructor() {
    super('Genre has existed', HttpStatus.FORBIDDEN, EXISTED_GENRE);
  }
}
