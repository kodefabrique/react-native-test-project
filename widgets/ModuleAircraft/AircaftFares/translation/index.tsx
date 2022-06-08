export const NAMESPACE = 'AIRCRAFT_FARES';

export enum KEYS {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS',
  PREMIUM = 'PREMIUM',
}

export const FARES_LIST: {
  [key: string]: string;
} = {
  ['Economy']: KEYS.ECONOMY,
  ['Business']: KEYS.BUSINESS,
  ['Premium']: KEYS.PREMIUM,
};
