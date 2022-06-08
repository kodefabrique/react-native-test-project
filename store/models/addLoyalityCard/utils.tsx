import { IAddLoyalityCardState } from 'types/store/addLoyalityCard';
// import { Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

export const toggle = (state: IAddLoyalityCardState): boolean => {
  return !state.isVisible;
};

export const toggleSuccess = (state: IAddLoyalityCardState): boolean => {
  return !state.isSuccessVisible;
};

// export const slideWidth = (state: ILoginState, calcFun: ISinglFunc<ILoginState, number>): number => {
//   return calcFun(state);
// };

// export const calcAddition = ({ slideAnim }: ILoginState): number => {
//   return slideAnim + windowWidth;
// };

// export const calcSubtract = ({ slideAnim }: ILoginState): number => {
//   return slideAnim !== 0 ? slideAnim - windowWidth : slideAnim;
// };
