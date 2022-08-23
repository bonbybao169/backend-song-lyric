import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'commons/filters/exceptions/BaseException';

import { EXISTED_USER } from './constants';

export class UserExistedException extends BaseException {
  constructor() {
    super('User has existed', HttpStatus.FORBIDDEN, EXISTED_USER);
  }
}
