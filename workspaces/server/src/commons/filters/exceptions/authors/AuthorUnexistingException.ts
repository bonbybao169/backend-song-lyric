import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { UNEXISTING_AUTHOR } from './constants';

export class AuthorUnexistingException extends BaseException {
  constructor() {
    super('Author does not exist', HttpStatus.NOT_FOUND, UNEXISTING_AUTHOR);
  }
}
