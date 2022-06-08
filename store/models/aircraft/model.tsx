import { IAircraftState, Aircraft_AircraftInfo } from 'types';
import { createLoggedAsyncAction } from 'utils';
import { initState } from './state';
import { getVariablesAircraft } from './parser';
import { getAircraftInfo } from './graph';

export const aircraft = {
  state: initState,
  reducers: {
    getAircraft(state: IAircraftState): IAircraftState {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    },
    doneAircraft(state: IAircraftState, payload: Aircraft_AircraftInfo): IAircraftState {
      return {
        ...state,
        isError: false,
        isLoading: false,
        aircraftInfo: payload,
      };
    },
    failAircraft(state: IAircraftState): IAircraftState {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    },
  },
  effects: (dispatch) => ({
    getAircraft: createLoggedAsyncAction<string, void>(
      async (payload: string) => {
        const variablesAircraft = getVariablesAircraft(payload);
        const result = await getAircraftInfo(variablesAircraft);
        dispatch.aircraft.doneAircraft(result.data.AircraftInfo);
      },
      async () => {
        dispatch.aircraft.failAircraft();
      }
    ),
  }),
};
