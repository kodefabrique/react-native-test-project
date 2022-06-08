import { init } from '@rematch/core';
import { getPersistor } from '@rematch/persist';
import { actionsLogger } from './middlewares';
import { citizenshipSelect } from './models/citizenship';
import AsyncStorage from '@react-native-community/async-storage';
import createRematchPersist from '@rematch/persist';
import { MODELS_NAMES, PERSIST_KEY } from 'values';
import { app } from './models/app';
import { search } from './models/search';
import { place } from './models/place';
import { sendSecureCode } from './models/sendSecureCode';
import { redirectUrl } from './models/oAuthRedirectUrl';
import { authenticate } from './models/authenticate';
import { profile } from './models/profile';
import { updateUserProfile } from './models/updateUserProfile';
import { logout } from './models/logout';
import { travellerProfiles, travellerProfilesSelect } from './models/travellerProfiles';
import { createTravellerProfile } from './models/createTraveller';
import { updateTravellerProfile } from './models/updateTraveller';
import { deleteTravellerProfile } from './models/deleteTraveller';
import { flightDetail, flightDetailSelect } from './models/flightDetail';
import { priceGraph } from './models/priceGraph';
import { order, orderSelect } from './models/order';
import { login } from './models/login';
import { currentUser } from './models/currentUser';
import { steps } from './models/steps';
import { bookingOrder, bookingOrderSelect } from './models/bookingOrder';
import { compareFlight } from './models/compareFlight';
import { booking, bookingSelect } from './models/booking';
import { orderDocuments } from './models/orderDocuments';
import { seats, seatsSelect } from './models/seats';
import { updateApp } from './models/updateApp';
import { calendar } from './models/calendar';
import { compose, composeSelect } from './models/compose';
import { account } from './models/account';
import { meals, mealsSelect } from './models/meals';
import { baggage, baggageSelect } from './models/baggage';
import { extras, extrasSelect } from './models/extras';
import { payment } from './models/payment';
import { fare } from './models/fare';
import { defaultTravellerProfile } from './models/defaultTravellerProfile';
import { checkIn, checkInSelect } from './models/checkIn';
import { aircraft } from './models/aircraft';
import { runtime } from './models/runtime';
import { checkInForme } from './models/checkInForme';
import { addLanguageListner } from './listners';
import { offline } from './models/offline';
import { pricing } from './models/pricing';
import { bookingOrders } from './models/bookingOrders';
import { languageReset } from './rootReducers/languageReset';
import { totalReset } from './rootReducers/totalReset';
import { orderReset } from './rootReducers/orderReset';
import { searchReset } from './rootReducers/searchReset';
import { orderingReset } from './rootReducers/orderingReset';
import { tokens } from './models/tokens';
import { boardingPassModals } from './models/boardingPassModals';
import { recoveryMiles } from './models/recoveryMiles';
import { addLoyalityCard } from './models/addLoyalityCard';
import { ffpDefaultAccount } from './models/ffpDefaultAccount';
import { conditions } from './models/conditions';
import { createAccount } from './models/createAccount';
import { confirmModal } from './models/confirmModal';
import { rules } from './models/rules';
import { addPhotoModal } from './models/addPhotoModal';
import { STORE_ROOT_REDUCERS } from 'types';

const baseModels = {
  app,
  login,
  order,
  search,
  place,
  sendSecureCode,
  redirectUrl,
  authenticate,
  logout,
  profile,
  updateApp,
  updateUserProfile,
  travellerProfiles,
  ffpDefaultAccount,
  createTravellerProfile,
  updateTravellerProfile,
  deleteTravellerProfile,
  flightDetail,
  priceGraph,
  currentUser,
  steps,
  bookingOrder,
  bookingOrders,
  compareFlight,
  booking,
  orderDocuments,
  seats,
  calendar,
  compose,
  account,
  meals,
  baggage,
  extras,
  payment,
  fare,
  defaultTravellerProfile,
  checkIn,
  aircraft,
  runtime,
  checkInForme,
  offline,
  pricing,
  tokens,
  conditions,
  boardingPassModals,
  recoveryMiles,
  addLoyalityCard,
  confirmModal,
  createAccount,
  rules,
  addPhotoModal,
};

const persistPlugin = createRematchPersist({
  key: PERSIST_KEY,
  storage: AsyncStorage,
  whitelist: [
    MODELS_NAMES.APP,
    MODELS_NAMES.ACCOUNT,
    MODELS_NAMES.AUTHENTICATE,
    MODELS_NAMES.SEARCH,
    MODELS_NAMES.PROFILE,
    MODELS_NAMES.CURRENT_USER,
    MODELS_NAMES.TOKENS,
    MODELS_NAMES.ORDERS,
  ],
});

export const select = {
  baggage: baggageSelect,
  compose: composeSelect,
  travellerProfiles: travellerProfilesSelect,
  booking: bookingSelect,
  meals: mealsSelect,
  seats: seatsSelect,
  order: orderSelect,
  extras: extrasSelect,
  citizenship: citizenshipSelect,
  checkIn: checkInSelect,
  flightDetail: flightDetailSelect,
  bookingOrder: bookingOrderSelect,
};

export const store = init({
  models: baseModels,
  plugins: [persistPlugin],
  redux: {
    middlewares: [actionsLogger],
    rootReducers: {
      [STORE_ROOT_REDUCERS.LANGUAGE_RESET]: languageReset,
      [STORE_ROOT_REDUCERS.TOTAL_RESET]: totalReset,
      [STORE_ROOT_REDUCERS.ORDER_RESET]: orderReset,
      [STORE_ROOT_REDUCERS.SEARCH_RESET]: searchReset,
      [STORE_ROOT_REDUCERS.ORDERING_RESET]: orderingReset,
    },
  },
});

addLanguageListner(store);

export type IDispatch = typeof store.dispatch;

export const persistor = getPersistor();
