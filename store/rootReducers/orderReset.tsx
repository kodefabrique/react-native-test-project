import { excludeModels } from 'utils';

export function orderReset(state: any) {
  return excludeModels(state, [
    'flightDetail',
    'compareFlight',
    'booking',
    'bookingOrders',
    'meals',
    'seats',
    'baggage',
    'fare',
    'steps',
    'bookingOrder',
  ]);
}
