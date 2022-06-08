import { FareRules_FareRules_rulesForSegments_segments as TSegment } from 'types';

export function formateTitle(segment: TSegment) {
  const departureName =
    (segment &&
      segment.departure &&
      segment.departure.airport &&
      segment.departure.airport.city &&
      segment.departure.airport.city.name) ||
    'None';

  const arrivalName =
    (segment &&
      segment.arrival &&
      segment.arrival.airport &&
      segment.arrival.airport.city &&
      segment.arrival.airport.city.name) ||
    'None';

  return `${departureName} - ${arrivalName}`;
}
