import { AddLoyaltyCardStatus, IAddLoyalityCardState, ModalAddCardtypes } from 'types/store/addLoyalityCard';
import { toggle, toggleSuccess } from './utils';
import { initState } from './state';
import { IFetchingStatus, ResetFfpPasswordParameters, SendNewFfpPasswordParameters } from 'types';
import { createLoggedAsyncAction } from 'utils';
import { SendNewFfpPassword, SendResetFfpPasswordCode } from './graph';

export const addLoyalityCard = {
  state: initState,
  reducers: {
    reset: (): IAddLoyalityCardState => {
      return { ...initState };
    },

    toggleVisible: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return { ...state, isVisible: toggle(state) };
    },

    toggleSuccessVisible: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return { ...state, isSuccessVisible: toggleSuccess(state) };
    },

    setCurrentModalType: (state: IAddLoyalityCardState, value: ModalAddCardtypes): IAddLoyalityCardState => {
      return { ...state, modalType: value };
    },

    setCardNumber: (state: IAddLoyalityCardState, value: string): IAddLoyalityCardState => {
      return { ...state, cardNumber: value };
    },

    setAddLoyaltyCardStatus: (state: IAddLoyalityCardState, value: AddLoyaltyCardStatus): IAddLoyalityCardState => {
      return { ...state, addLoyaltyCardStatus: value };
    },

    pushResetFfpPassword: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return {
        ...state,
        resetFfpPasswordStatus: IFetchingStatus.LOADING,
      };
    },

    doneResetFfpPassword: (state: IAddLoyalityCardState, payload: boolean): IAddLoyalityCardState => {
      return {
        ...state,
        resetFfpPasswordStatus: IFetchingStatus.PASSED,
        resetFfpPasswordResult: payload,
      };
    },

    failResetFfpPassword: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return {
        ...state,
        resetFfpPasswordStatus: IFetchingStatus.FAIL,
      };
    },

    pushSendNewFfpPassword: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return {
        ...state,
        sendNewFfpPasswordStatus: IFetchingStatus.LOADING,
      };
    },

    doneSendNewFfpPassword: (state: IAddLoyalityCardState, payload: boolean): IAddLoyalityCardState => {
      return {
        ...state,
        sendNewFfpPasswordStatus: IFetchingStatus.PASSED,
        sendNewFfpPasswordResult: payload,
      };
    },

    failSendNewFfpPassword: (state: IAddLoyalityCardState): IAddLoyalityCardState => {
      return {
        ...state,
        sendNewFfpPasswordStatus: IFetchingStatus.FAIL,
      };
    },

    setSendNewFfpPasswordStatus: (state: IAddLoyalityCardState, payload: IFetchingStatus): IAddLoyalityCardState => {
      return {
        ...state,
        sendNewFfpPasswordStatus: payload,
        sendNewFfpPasswordResult: null,
      };
    },

    // setCurrentStep: (state: ILoginState, value: number): ILoginState => {
    //   return { ...state, currentStep: value };
    // },

    // setLogin: (state: ILoginState, value: string): ILoginState => {
    //   return { ...state, loginValue: value };
    // },

    // nextStep: (state: ILoginState): ILoginState => {
    //   return { ...state, slideAnim: slideWidth(state, calcAddition) };
    // },

    // prevStep: (state: ILoginState): ILoginState => {
    //   return { ...state, slideAnim: slideWidth(state, calcSubtract) };
    // },
  },

  effects: (dispatch) => ({
    pushResetFfpPassword: createLoggedAsyncAction<ResetFfpPasswordParameters, void>(
      async (payload: ResetFfpPasswordParameters) => {
        const result = await SendResetFfpPasswordCode(payload);

        dispatch.addLoyalityCard.doneResetFfpPassword(result?.data?.SendResetFfpPasswordCode);
        if (result.data.SendResetFfpPasswordCode) {
          dispatch.addLoyalityCard.setCurrentModalType(ModalAddCardtypes.ENTER_CODE);
        }
      },
      async () => {
        dispatch.addLoyalityCard.failResetFfpPassword();
      }
    ),

    pushSendNewFfpPassword: createLoggedAsyncAction<SendNewFfpPasswordParameters, void>(
      async (payload: SendNewFfpPasswordParameters) => {
        const result = await SendNewFfpPassword(payload);

        dispatch.addLoyalityCard.doneSendNewFfpPassword(result?.data?.SendNewFfpPassword);
      },
      async () => {
        dispatch.addLoyalityCard.failSendNewFfpPassword();
      }
    ),
  }),
};
