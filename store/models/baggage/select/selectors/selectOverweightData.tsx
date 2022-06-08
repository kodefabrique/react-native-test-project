import {
  IStoreState,
  IBookingTraveller,
  ISelectedFareFamily,
  IBaggageData,
  GetBaggageMutation_ActualizeOrder_additionalServices_gdsServices_services_OrderAdditionalServiceGdsServiceBaggage as TBaggage,
} from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';
import { baggage as baggageDomain } from 'core';
import { getOrderStack } from '../common';

interface IProps {
  travellerOrder: number;
  segmentOrder: number;
}

const getSegmentOrder = createLoggedSelector(
  (_: IStoreState, props: IProps) => {
    return props;
  },
  {
    travellerOrder: 0,
    segmentOrder: 0,
  }
);

const getTravellerBaggage = createLoggedSelector(
  ({ booking }: IStoreState, { travellerOrder }: { travellerOrder: number; segmentOrder: number }) => {
    return booking.travellers[travellerOrder];
  },
  null
);

const getBaggage = createLoggedSelector(({ baggage }: IStoreState) => {
  return baggage.data;
}, []);

export const selectOverweightData = createSelector(
  getTravellerBaggage,
  getBaggage,
  getOrderStack,
  getSegmentOrder,
  createLoggedSelector(
    (
      traveller: IBookingTraveller,
      baggages: TBaggage[],
      stack: ISelectedFareFamily[],
      props: IProps
    ): IBaggageData[] => {
      return baggageDomain
        .getOverweight(traveller, baggages, stack, props)
        .sort(({ price: { amount: a } }, { price: { amount: b } }) => a - b);
    },
    []
  )
);
