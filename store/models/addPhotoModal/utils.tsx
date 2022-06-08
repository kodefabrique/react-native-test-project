import { IAddPhotoModalState } from 'types/store/addPhotoModal';

export const toggle = (state: IAddPhotoModalState): boolean => {
  return !state.isVisible;
};
