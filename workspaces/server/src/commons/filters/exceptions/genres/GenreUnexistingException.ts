import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { UNEXISTING_GENRE } from './constants';

export class GenreUnexistingException extends BaseException {
  constructor() {
    super('Genre does not exist', HttpStatus.NOT_FOUND, UNEXISTING_GENRE);
  }
}
