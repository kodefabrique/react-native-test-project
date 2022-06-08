import {
  IStoreState,
  ISelectIsOverweigth,
  IBookingTraveller,
  ISelectedFareFamily,
  GetBaggageMutation_ActualizeOrder_additionalServices_gdsServices_services_OrderAdditionalServiceGdsServiceBaggage as TBaggage,
} from 'types';
import { createSelector } from 'reselect';
import { calcPriceDisplayString, createLoggedSelector } from 'utils';
import { getOrderStack } from '../common';
import { baggage as baggageDomain } from 'core';

interface IProps {
  travellerOrder: number;
  segmentOrder: number;
}

const getTravellerBaggage = createLoggedSelector(
  ({ booking }: IStoreState, { travellerOrder }: { travellerOrder: number; segmentOrder: number }) => {
    return booking.travellers[travellerOrder];
  },
  null
);

const getSegmentOrder = createLoggedSelector(
  (_: IStoreState, props: IProps) => {
    return props;
  },
  {
    travellerOrder: 0,
    segmentOrder: 0,
  }
);

const getBaggage = createLoggedSelector(({ baggage }: IStoreState) => {
  return baggage.data;
}, []);

export function makeSelectIsHaveOverweight() {
  return createSelector(
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
      ): ISelectIsOverweigth => {
        const allowedBaggages = baggageDomain.getOverweight(traveller, baggages, stack, props);
        const selected = traveller.overweight;
        const isOverweight = !!allowedBaggages.length;

        if (selected) {
          const price = calcPriceDisplayString({ price: selected.price });

          return {
            isOverweight,
            value: [selected.weight, price],
          };
        }

        return {
          isOverweight,
          value: ['', ''],
        };
      },
      {
        isOverweight: false,
        value: ['', ''],
      }
    )
  );
}
