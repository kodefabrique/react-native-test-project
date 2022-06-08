import { ISelectedFareFamily } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';
import { getOrderStack } from '../common';

export function makeSelectIsSwitchable() {
  const selectOrderLength = createSelector(
    getOrderStack,
    createLoggedSelector((stack: ISelectedFareFamily[]): number => {
      return stack.length;
    }, 0)
  );

  return createSelector(
    selectOrderLength,
    createLoggedSelector((stackLen: number): boolean => {
      return stackLen !== 1;
    }, false)
  );
}
