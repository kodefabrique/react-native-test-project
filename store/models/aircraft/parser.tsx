import { AircraftVariables } from 'types';

export const getVariablesAircraft = (payload: string): AircraftVariables => {
  return { id: payload };
};
