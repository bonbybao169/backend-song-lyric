/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultKey = 'default';

export function memoize(fn: Function) {
  const cache: Record<string, unknown> = {};
  return (...args: any[]) => {
    const n =
      args.reduce((key, arg) => {
        const argToConcat =
          typeof arg === 'string'
            ? arg
            : typeof arg === 'object'
            ? JSON.stringify(arg)
            : arg.toString();
        return key.concat('|', argToConcat);
      }, '') || defaultKey;
    if (n in cache) {
      return cache[n];
    }

    const result = n === defaultKey ? fn() : fn(...args);
    cache[n] = result;
    return result;
  };
}

import type {
  Dictionary,
  MapOptions,
  Mapper,
  ModelIdentifier,
} from '@automapper/core';
import { isEmpty } from '@automapper/core';

export function shouldSkipTransform<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
>(
  mapper: Mapper | undefined,
  from: ModelIdentifier<TDestination>,
  to: ModelIdentifier<TSource>,
): boolean {
  return !mapper || !to || !from;
}

export function transformArray<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
>(
  value: TSource[],
  mapper: Mapper | undefined,
  from: ModelIdentifier<TSource>,
  to: ModelIdentifier<TDestination>,
  options?: MapOptions<TSource[], TDestination[]>,
) {
  if (!Array.isArray(value)) return value;
  return mapper?.mapArray(value, from, to, options);
}

export function getTransformOptions<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
>(
  options?: { isArray?: boolean; mapperName?: string } & MapOptions<
    TSource,
    TDestination
  >,
): {
  mapperName?: string;
  isArray: boolean;
  transformedMapOptions?: MapOptions<TSource, TDestination>;
} {
  const { isArray = false, mapperName, ...mapOptions } = options || {};
  const transformedMapOptions = isEmpty(mapOptions) ? undefined : mapOptions;
  return { isArray, mapperName, transformedMapOptions };
}
