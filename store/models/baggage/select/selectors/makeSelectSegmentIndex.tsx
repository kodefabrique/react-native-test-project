import { IStoreState, ISelectedFareFamily } from 'types';
import { createSelector } from 'reselect';
import { flatArr, createLoggedSelector } from 'utils';
import { getOrderStack } from '../common';

const getSegmentOrder = createLoggedSelector(
  (
    _: IStoreState,
    props: {
      travellerOrder: number;
      segmentOrder: number;
    }
  ) => {
    return props.segmentOrder;
  },
  0
);

export function makeSelectSegmentIndex() {
  const selectSelectedSegment = createSelector(
    getOrderStack,
    getSegmentOrder,
    createLoggedSelector((stack: ISelectedFareFamily[], segmentOrder: number) => {
      const legsStack = stack
        ?.map(({ flightInfo, priceInfo }, segmentIndex) =>
          flightInfo.map((flight) => ({
            priceInfo,
            segmentIndex,
            flightInfo: [flight],
          }))
        )
        .reduce(flatArr, []);

      return legsStack[segmentOrder];
    }, null)
  );

  return createSelector(
    selectSelectedSegment,
    createLoggedSelector((segment: ISelectedFareFamily & { segmentIndex: number }) => {
      return segment.segmentIndex;
    }, 0)
  );
}
