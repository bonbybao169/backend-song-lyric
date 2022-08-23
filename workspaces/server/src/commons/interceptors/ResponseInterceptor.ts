import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import type { IPagination, IToken } from 'interface';

interface IResponse<T> {
  data: T;
  metadata?: IPagination | IToken;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((obj) => {
        if (!obj.metadata) {
          if (!obj.data) {
            return {
              data: obj,
            };
          }

          return obj;
        }

        const { data, metadata } = obj;
        return {
          data,
          metadata,
        };
      }),
    );
  }
}
