import { IFetchingStatus } from 'types';
import { AddLoyaltyCardStatus, IAddLoyalityCardState, ModalAddCardtypes } from 'types/store/addLoyalityCard';

export const initState: IAddLoyalityCardState = {
  isVisible: false,
  modalType: ModalAddCardtypes.ADD_CARD,
  cardNumber: '',
  addLoyaltyCardStatus: AddLoyaltyCardStatus.NULL,
  isSuccessVisible: false,
  resetFfpPasswordStatus: IFetchingStatus.NULL,
  resetFfpPasswordResult: null,
  sendNewFfpPasswordStatus: IFetchingStatus.NULL,
  sendNewFfpPasswordResult: null,
  // currentStep: 1,
  // maxStep: 2,
  // loginValue: null,
  // slideAnim: 0,
};
