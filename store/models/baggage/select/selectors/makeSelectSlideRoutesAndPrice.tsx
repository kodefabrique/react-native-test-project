import {
  IStoreState,
  ISelectedFareFamily,
  ISelectSlidePriceAndType,
  GetBaggageMutation_ActualizeOrder_additionalServices_gdsServices_services_OrderAdditionalServiceGdsServiceBaggage as TBaggage,
} from 'types';
import { createSelector } from 'reselect';
import {
  calcSegmentBaggagePrice,
  calcPriceDisplayString,
  createLoggedSelector,
  extractSignificantFlights,
} from 'utils';
import { getOrderStack } from '../common';

const getTravellerBaggage = createLoggedSelector(({ booking }: IStoreState, prop: number) => {
  return booking.travellers[prop].baggage;
}, []);

export function makeSelectSlideRoutesAndPrice() {
  const selectOrderRoutes = createSelector(
    getOrderStack,
    createLoggedSelector((stack: ISelectedFareFamily[]): {
      departure: string;
      arrival: string;
    }[] => {
      return stack.map(({ flightInfo }) => {
        const { firstFlight, lastFlight } = extractSignificantFlights(flightInfo);

        try {
          return {
            departure: firstFlight.departure.airport.city.name,
            arrival: lastFlight.arrival.airport.city.name,
          };
        } catch {
          return {
            departure: 'From',
            arrival: 'To',
          };
        }
      });
    }, [])
  );

  return createSelector(
    selectOrderRoutes,
    getTravellerBaggage,
    createLoggedSelector(
      (routes: { departure: string; arrival: string }[], baggage: TBaggage[][]): ISelectSlidePriceAndType[] => {
        return routes.map((route, flightOrder) => ({
          ...route,
          price: baggage[flightOrder].length
            ? calcPriceDisplayString({ price: calcSegmentBaggagePrice(baggage[flightOrder]) })
            : 'SELECT',
        }));
      },
      []
    )
  );
}
