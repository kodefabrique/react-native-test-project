import { IStoreState, IBookingState } from 'types';
import { createLoggedSelector } from 'utils';

export const getTravellers = createLoggedSelector(({ travellers }: IBookingState) => {
  return travellers;
}, []);

export const getOrderStack = createLoggedSelector(({ order }: IStoreState) => {
  return order.selectedStack;
}, []);
