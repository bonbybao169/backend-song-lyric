import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { UNEXISTING_SONG } from './constants';

export class SongUnexistingException extends BaseException {
  constructor() {
    super('Song does not exist', HttpStatus.NOT_FOUND, UNEXISTING_SONG);
  }
}
