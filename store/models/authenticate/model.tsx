import {
  Authenticate,
  AuthenticateVariables,
  IAuthenticateState,
  IInputValidationError,
  IAuthenticateError,
  SaveAuthMethodMutation,
  DeleteAuthMethodMutation,
  DeleteAuthMethodMutationVariables,
  ConfirmAuthMethodMutation,
  IStoreState,
  AccountExistenceQuery,
  IGraphQLErrors,
  IInternalError,
} from 'types';
import { createLoggedAsyncAction } from 'utils';
import { initState } from './state';
import {
  AuthenticateMutation,
  callSaveAuthMethodMutation,
  callDeleteAuthMethodMutation,
  callConfirmAuthMethodMutation,
  callAccountExistenceQuery,
} from './graph';
import { formateConfirmRequest, formateSaveRequest, formateAccExistRequest, parseError } from './parser';
import { setInitBoolWithMessageState } from './utils';

export const authenticate = {
  state: initState,
  reducers: {
    setInitState: () => {
      return initState;
    },

    pushAuthenticate: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: true,
      };
    },

    doneAuthenticate: (state: IAuthenticateState, payload: Authenticate): IAuthenticateState => {
      return {
        ...state,
        data: payload.Authenticate,
        isFetching: false,
      };
    },

    failAuthenticate: (state: IAuthenticateState, errors: IInputValidationError | IAuthenticateError[]) => {
      return {
        ...state,
        errors,
        isFetching: false,
      };
    },

    pushAccountExistenceInitState: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        accountExistence: setInitBoolWithMessageState(),
      };
    },

    pushAccountExistence: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: true,
      };
    },

    doneAccountExistence: (state: IAuthenticateState, payload: AccountExistenceQuery): IAuthenticateState => {
      return {
        ...state,
        accountExistence: payload.AccountExistence,
        isFetching: false,
      };
    },

    failAccountExistence: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: false,
      };
    },

    pushSaveAuthMethodInitState: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        saveAuthMethod: setInitBoolWithMessageState(),
      };
    },

    pushSaveAuthMethod: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: true,
      };
    },

    doneSaveAuthMethod: (state: IAuthenticateState, payload: SaveAuthMethodMutation): IAuthenticateState => {
      return {
        ...state,
        saveAuthMethod: payload.SaveAuthMethod,
        isFetching: false,
      };
    },

    failSaveAuthMethod: (state: IAuthenticateState, errors: IInputValidationError | IAuthenticateError[]) => {
      return {
        ...state,
        errors,
        isFetching: false,
      };
    },

    pushConfirmAuthMethod: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        confirmAuthMethodIsFetching: true,
      };
    },

    doneConfirmAuthMethod: (state: IAuthenticateState, payload: ConfirmAuthMethodMutation): IAuthenticateState => {
      return {
        ...state,
        confirmAuthMethod: payload.ConfirmAuthMethod,
        confirmAuthMethodIsFetching: false,
      };
    },

    failConfirmAuthMethod: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        confirmAuthMethodIsFetching: false,
      };
    },

    pushDeleteAuthMethod: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: true,
      };
    },

    doneDeleteAuthMethod: (state: IAuthenticateState, payload: DeleteAuthMethodMutation): IAuthenticateState => {
      return {
        ...state,
        deleteAuthMethod: payload.DeleteAuthMethod,
        isFetching: false,
      };
    },

    failDeleteAuthMethod: (state: IAuthenticateState): IAuthenticateState => {
      return {
        ...state,
        isFetching: false,
      };
    },
  },

  effects: (dispatch) => ({
    pushAuthenticate: createLoggedAsyncAction<AuthenticateVariables, IGraphQLErrors<IInternalError>>(
      async (payload: AuthenticateVariables) => {
        const resData = await AuthenticateMutation(payload);
        await dispatch.profile.pushProfile();
        dispatch.authenticate.doneAuthenticate(resData.data);
      },
      async (err: IGraphQLErrors<IInternalError>) => {
        dispatch.authenticate.failAuthenticate(err.graphQLErrors);
      }
    ),

    pushAccountExistence: createLoggedAsyncAction<void, void>(
      async (_: void, rootState: IStoreState) => {
        const requestData = formateAccExistRequest(rootState);
        const resData = await callAccountExistenceQuery(requestData);
        dispatch.authenticate.doneAccountExistence(resData.data);
      },
      async () => {
        dispatch.authenticate.failAccountExistence();
      }
    ),
    pushSaveAuthMethod: createLoggedAsyncAction<void, IGraphQLErrors<IInternalError>>(
      async (_: void, rootState: IStoreState) => {
        const requestData = formateSaveRequest(rootState);
        const resData = await callSaveAuthMethodMutation(requestData);
        dispatch.authenticate.doneSaveAuthMethod(resData.data);
      },
      async (err: IGraphQLErrors<IInternalError>, _: void, rootState: IStoreState) => {
        dispatch.account.setValidationError(parseError(err.graphQLErrors[0], rootState));
      }
    ),
    pushConfirmAuthMethod: createLoggedAsyncAction<void, void>(
      async (_: void, rootState: IStoreState) => {
        const requestData = formateConfirmRequest(rootState);
        const resData = await callConfirmAuthMethodMutation(requestData);
        dispatch.authenticate.doneConfirmAuthMethod(resData.data);
      },
      async () => {
        dispatch.account.failConfirmAuthMethod();
      }
    ),
    pushDeleteAuthMethod: createLoggedAsyncAction<DeleteAuthMethodMutationVariables, void>(
      async (payload: DeleteAuthMethodMutationVariables) => {
        const resData = await callDeleteAuthMethodMutation(payload);
        dispatch.authenticate.doneDeleteAuthMethod(resData.data);
      },
      async () => {
        dispatch.authenticate.failDeleteAuthMethod();
      }
    ),
  }),
};
