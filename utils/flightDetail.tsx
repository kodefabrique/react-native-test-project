import { IFlightDetailData } from 'types';
import { cutOffStringByLength } from './data';

export function extractSignificantFlights(
  flights: IFlightDetailData[]
): {
  firstFlight: IFlightDetailData;
  lastFlight: IFlightDetailData;
} {
  return {
    firstFlight: flights?.[0],
    lastFlight: flights?.[flights?.length - 1],
  };
}

export function calcPreviewRoutes(flightInfo: IFlightDetailData): string {
  try {
    const departureName = cutOffStringByLength(flightInfo.departure.airport.city.name, 6);
    const departureIATA = flightInfo.departure.airport.iata;

    const arrivalName = cutOffStringByLength(flightInfo.arrival.airport.city.name, 6);
    const arrivalIATA = flightInfo.arrival.airport.iata;

    return `${departureName} (${departureIATA}) - ${arrivalName} (${arrivalIATA})`;
  } catch {
    return '';
  }
}

export function calcPreviewIATA(flightInfo: IFlightDetailData[]): string {
  try {
    const { firstFlight, lastFlight } = extractSignificantFlights(flightInfo);

    const departureIATA = firstFlight.departure.airport.iata;
    const arrivalIATA = lastFlight.arrival.airport.iata;

    return `${departureIATA} - ${arrivalIATA}`;
  } catch {
    return '';
  }
}
