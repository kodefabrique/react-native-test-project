import { IBaggageState, IBaggageData, IStoreState } from 'types';
import { createLoggedAsyncAction } from 'utils';
import { initState } from './state';
import { parseData } from './parser';

export const baggage = {
  state: initState,
  reducers: {
    reloadState(): IBaggageState {
      return initState;
    },

    doneBaggage(state: IBaggageState, payload: IBaggageData[]): IBaggageState {
      return {
        ...state,
        isError: false,
        data: payload,
      };
    },

    failBaggage(state: IBaggageState): IBaggageState {
      return {
        ...state,
        isError: true,
      };
    },
  },

  effects: (dispatch) => ({
    extractBaggage: createLoggedAsyncAction<void, void>(
      async (_: void, rootState: IStoreState) => {
        const data = parseData(rootState);
        dispatch.baggage.doneBaggage(data);
      },
      async () => {
        dispatch.baggage.failBaggage();
      }
    ),
  }),
};
