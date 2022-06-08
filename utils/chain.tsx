import { DEFAULT_PRICE } from 'values';
import { ICommonPrice } from 'types';

export function flatObj<T>(acc: { [key: string]: T }, next: { [key: string]: T }): { [key: string]: T } {
  return { ...acc, ...next };
}

export function flat<T>(acc: T[], next: T): T[] {
  return [...acc, next];
}

export function flatArr<T>(acc: T[], next: T[]): T[] {
  return [...acc, ...next];
}

export function tap<T>(func: (item: T) => void) {
  return function (item: T) {
    func(item);
    return item;
  };
}

export function uniqValue<T>(acc: T[], next: T): T[] {
  return acc.includes(next) ? acc : [...acc, next];
}

export function uniqArr<T>(compareFunc: (left: T, right: T) => boolean) {
  return function (acc: T[], next: T): T[] {
    return acc.find((value) => compareFunc(value, next)) ? [...acc] : [...acc, next];
  };
}

export function minPrice(acc: ICommonPrice, next: ICommonPrice): ICommonPrice {
  if (acc && next) {
    return next.amount < acc.amount ? next : acc;
  }

  if (next) {
    return next;
  }

  if (acc) {
    return acc;
  }

  return DEFAULT_PRICE;
}

export function maxPrice(acc: ICommonPrice, next: ICommonPrice): ICommonPrice {
  if (acc && next) {
    return next.amount > acc.amount ? next : acc;
  }

  if (next) {
    return next;
  }

  if (acc) {
    return acc;
  }

  return DEFAULT_PRICE;
}

export function reduceMax(acc: number, next: number): number {
  return acc > next ? acc : next;
}

export function reduceSum(acc: number, next: number): number {
  return acc + next;
}

export function sumPrice(acc: ICommonPrice, next: ICommonPrice): ICommonPrice {
  return {
    amount: acc.amount + next.amount,
    currency: next.currency || acc.currency,
  };
}

export const compose = <T extends {}>(...funcs: any[]) => {
  const newCompose = funcs.reduceRight((acc, next) => (...args: any[]) => next(acc(...args)));

  return (...args: any[]): T => newCompose(...args);
};

export function createArr(length: number, fillValue?: any, force?: boolean) {
  return Array.from(new Array(length)).map((_, index) => (!force ? fillValue || index : fillValue));
}

export function splitArr<T>(arr: T[], start: number, splitLenth: number): T[][] {
  const pice = arr.slice(start, splitLenth);
  const rest = arr.slice(splitLenth);
  return rest.length ? [pice, ...splitArr(rest, start, splitLenth)] : [pice];
}
