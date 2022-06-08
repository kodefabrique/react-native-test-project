import { AviaPassengerType, IBookingTraveller, ISelectPriceAndType } from 'types';
import { createSelector } from 'reselect';
import { calcTravellerBaggagePrice, calcPriceDisplayString, createLoggedSelector } from 'utils';
import { getTravellers } from '../common';

export const selectPriceAndType = createSelector(
  getTravellers,
  createLoggedSelector((travellers: IBookingTraveller[]): ISelectPriceAndType[] => {
    const data = travellers.map((traveller, order) => ({
      order,
      data: {
        type: traveller.contact.type,
        price: calcPriceDisplayString({ price: calcTravellerBaggagePrice(traveller), isZeroDisplay: true }),
      },
    }));

    return data.length
      ? data
      : [
          {
            order: 0,
            data: {
              type: AviaPassengerType.ADT,
              price: 'None',
            },
          },
        ];
  }, [])
);
