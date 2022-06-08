import { IAddPhotoModalState } from 'types/store/addPhotoModal';
import { toggle } from './utils';
import { initState } from './state';

export const addPhotoModal = {
  state: initState,
  reducers: {
    toggleVisible: (state: IAddPhotoModalState): IAddPhotoModalState => {
      return { ...state, isVisible: toggle(state) };
    },

    reset: (): IAddPhotoModalState => {
      return { ...initState };
    },
  },
};
