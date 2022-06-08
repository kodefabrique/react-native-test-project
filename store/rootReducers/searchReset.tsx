import { excludeModels } from 'utils';

export function searchReset(state: any) {
  return excludeModels(state, [
    'flightDetail',
    'compareFlight',
    'order',
    'booking',
    'meals',
    'seats',
    'baggage',
    'fare',
    'steps',
  ]);
}
