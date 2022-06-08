import { IAppLanguage, STORE_ROOT_REDUCERS } from 'types';
import { addEventListener } from 'react-native-localize';
import { getI18n } from 'react-i18next';
import { getLanguage } from 'utils';
import Moment from 'moment';

const CHANGE = 'change';

function extractLanguage(rootState: any) {
  return rootState?.app?.language || IAppLanguage.EN;
}

export function addLanguageListner(store: any) {
  function listner() {
    const rootState = store.getState();
    const nextLanguague = extractLanguage(rootState);
    Moment.locale(nextLanguague);
    getI18n().changeLanguage(nextLanguague);
  }

  store.subscribe(listner);

  async function listnerSystemLanugage() {
    const language = getLanguage();
    store.dispatch({ type: STORE_ROOT_REDUCERS.LANGUAGE_RESET });
    store.dispatch.app.setLanguage(language);
  }

  addEventListener(CHANGE, listnerSystemLanugage);
}
