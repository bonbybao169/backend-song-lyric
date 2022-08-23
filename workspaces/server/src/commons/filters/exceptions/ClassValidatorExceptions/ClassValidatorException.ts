import { HttpStatus, ValidationError } from '@nestjs/common';

import { CLASS_VALIDATOR_ERROR } from 'commons/filters/exceptions/ClassValidatorExceptions/constants';
import { BaseException } from 'commons/filters/exceptions/BaseException';

export class ClassValidatorException extends BaseException {
  constructor(errors: ValidationError[]) {
    const message = errors.reduce<string[]>((result, error) => {
      result.push(...Object.values(error.constraints));

      return result;
    }, []);

    super(message, HttpStatus.BAD_REQUEST, CLASS_VALIDATOR_ERROR);
  }
}
