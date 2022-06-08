import { excludeModels } from 'utils';

export function orderingReset(state: any) {
  return excludeModels(state, ['meals', 'seats', 'baggage', 'fare']);
}
