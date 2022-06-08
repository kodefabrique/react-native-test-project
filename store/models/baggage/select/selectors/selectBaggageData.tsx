import { IStoreState, IBaggageData, IBookingTraveller, ISelectedFareFamily, ISelectPreviewBaggageData } from 'types';
import { createSelector } from 'reselect';
import {
  calcPreviewIATA,
  calcBaggageBookingPrice,
  calcPriceDisplayString,
  countBaggageBySegment,
  createLoggedSelector,
  calcFilledContactNames,
} from 'utils';
import { DEFAULT_PRICE } from 'values';
import { flatArr } from 'utils';

const getSelectedStack = createLoggedSelector(({ order }: IStoreState) => {
  return order.selectedStack;
}, []);

const getTravellers = createLoggedSelector(({ booking }: IStoreState) => {
  return booking.travellers;
}, []);

const calcName = createLoggedSelector(({ contact }: IBookingTraveller, travellerOrder: number) => {
  const name = calcFilledContactNames({ contact });

  return {
    name,
    type: contact.type,
    prefix: `${travellerOrder + 1}.`,
  };
}, null);

function calcBaggages(traveller: IBookingTraveller, segmentOrder: number) {
  const filterOverweight = (overweight: IBaggageData) => overweight?.price;
  const baggages = traveller.isUnited
    ? traveller.unitedBaggage.map(({ count, name, weight }) => ({
        title: name,
        weight: `${count}x${weight}`,
      }))
    : countBaggageBySegment(traveller.baggage[segmentOrder]).map(({ baggage, count }) => ({
        title: baggage.name,
        weight: `${count}x${baggage.weight}`,
      }));
  const overweight = [traveller.overweight].filter(filterOverweight).map(({ count, name, weight }) => ({
    title: name,
    weight: `${count}x${weight}`,
  }));
  return [...baggages, ...overweight];
}

export const selectBaggageData = createSelector(
  getTravellers,
  getSelectedStack,
  createLoggedSelector(
    (travellers: IBookingTraveller[], selectedStack: ISelectedFareFamily[]): ISelectPreviewBaggageData[] => {
      return travellers.map((traveller, travellerOrder) => ({
        contact: calcName(traveller, travellerOrder),
        segments: selectedStack.map((item, segmentIndex) => {
          return {
            routes: calcPreviewIATA(item.flightInfo),
            baggages: calcBaggages(traveller, segmentIndex),
          };
        }),
      }));
    },
    []
  )
);

export const selectBaggagePrice = createSelector(
  getTravellers,
  createLoggedSelector((travellers: IBookingTraveller[]) => {
    const filterOverweight = (overweight: IBaggageData) => overweight?.price;
    const selected = travellers
      .map((traveller) => {
        const baggages = traveller.isUnited
          ? traveller.unitedBaggage.filter((baggage) => baggage).filter(({ price }) => price)
          : traveller.baggage
              .reduce(flatArr, [])
              .filter((baggageBySegment) => baggageBySegment)
              .filter(({ price }) => price);
        const overweight = [traveller.overweight].filter(filterOverweight);
        return [...baggages, ...overweight].map(({ price }) => price);
      })
      .reduce(flatArr, []);

    return selected.length
      ? calcPriceDisplayString({
          price: calcBaggageBookingPrice(travellers),
          isZeroDisplay: false,
        })
      : 'SELECT';
  }, calcPriceDisplayString({ price: DEFAULT_PRICE, isZeroDisplay: false }))
);
