/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Strategy from 'passport-facebook-token';

declare module 'passport-facebook-token' {
  type VerifyCallback = (error: any, user?: any, info?: any) => void;
}
