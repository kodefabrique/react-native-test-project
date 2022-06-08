import { ContentType, IStoreState, ISelectedFareFamily } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector, reduceSum } from 'utils';
import { getOrderStack } from '../common';

const getTravellerSameBaggage = createLoggedSelector(({ booking }: IStoreState, prop: number) => {
  return booking.travellers[prop].isUnited;
}, false);

export function makeSelectContentType() {
  return createSelector(
    getOrderStack,
    getTravellerSameBaggage,
    createLoggedSelector((stack: ISelectedFareFamily[], sameBaggage: boolean): ContentType => {
      const stackLen = stack?.map(({ flightInfo }) => flightInfo?.length)?.reduce(reduceSum, 0);

      if (stackLen === 1) {
        return ContentType.ONE_ROUTE;
      }

      if (sameBaggage) {
        return ContentType.SAME;
      }

      return ContentType.MULTI_ROUTE;
    }, ContentType.ONE_ROUTE)
  );
}
