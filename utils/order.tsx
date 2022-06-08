import {
  ISelectedFareFamily,
  PriceDetailQuery_SearchResult_flightDirections_legs_pricesForFareGroups as TGroups,
} from 'types';

export function isFareFamilyAvailable({
  segmentOrder,
  pricesForFareGroups,
  selectedStack,
}: {
  segmentOrder: number;
  pricesForFareGroups: TGroups;
  selectedStack: ISelectedFareFamily[];
}): boolean {
  const isNotDifferentFareFamily = calcIsNotDifferentFareFamily({
    segmentOrder,
    pricesForFareGroups,
    selectedStack,
  });

  const isInSelectedIdsScope = calcIsInSelectedIdsScope({
    segmentOrder,
    pricesForFareGroups,
    selectedStack,
  });

  return isNotDifferentFareFamily && isInSelectedIdsScope;
}

function calcIsNotDifferentFareFamily({
  segmentOrder,
  pricesForFareGroups,
  selectedStack,
}: {
  segmentOrder: number;
  pricesForFareGroups: TGroups;
  selectedStack: ISelectedFareFamily[];
}) {
  const selectedStackMaxIndex = segmentOrder - 1;

  const targetFareFamilyId = pricesForFareGroups?.fareFamily?.id;

  return selectedStackMaxIndex >= 0
    ? selectedStack
        .filter((_, index) => index <= selectedStackMaxIndex)
        .filter((selectedInStack) => selectedInStack)
        .map(({ priceInfo }) => priceInfo)
        .map(({ fareFamily }) => fareFamily)
        .map(({ id }) => id)
        .every((id) => id === targetFareFamilyId)
    : true;
}

function calcIsInSelectedIdsScope({
  segmentOrder,
  pricesForFareGroups,
  selectedStack,
}: {
  segmentOrder: number;
  pricesForFareGroups: TGroups;
  selectedStack: ISelectedFareFamily[];
}) {
  const selectedStackMaxIndex = segmentOrder - 1;
  const selectedStackLen = segmentOrder;

  const targetIds = pricesForFareGroups.prices
    ? pricesForFareGroups.prices.filter((price) => price).map(({ flight }) => flight.id)
    : [];

  return selectedStackMaxIndex >= 0
    ? selectedStack
        .filter((_, index) => index <= selectedStackMaxIndex)
        .filter((selectedInStack) => selectedInStack)
        .map(({ priceInfo }) => priceInfo)
        .map(({ prices }) => prices)
        .filter((prices) => prices)
        .reduce((acc, next) => [...acc, ...next], [])
        .filter((price) => price)
        .map(({ flight }) => flight.id)
        .reduce(
          (acc, next) =>
            acc.find(({ id }) => id === next)
              ? acc.map(({ id, count }) => (id === next ? { id, count: count + 1 } : { id, count }))
              : [...acc, { id: next, count: 1 }],
          []
        )
        .filter(({ count }) => count === selectedStackLen)
        .map(({ id }) => id)
        .some((id) => targetIds.includes(id))
    : true;
}
