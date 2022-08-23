import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { UNEXISTING_SINGER } from './constants';

export class SingerUnexistingException extends BaseException {
  constructor() {
    super('Singer does not exist', HttpStatus.NOT_FOUND, UNEXISTING_SINGER);
  }
}
