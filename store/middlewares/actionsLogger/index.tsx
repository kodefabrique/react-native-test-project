import { IStoreState } from 'types';
import { rematchActionsLogger } from 'logging';

interface IStore {
  getState(): IStoreState;
}

interface IAction {
  type: string;
  payload: IStoreState;
}

export function actionsLogger(store: IStore) {
  return function (next: (action: IAction) => void) {
    return function (action: IAction) {
      rematchActionsLogger(action, store.getState());
      return next(action);
    };
  };
}
