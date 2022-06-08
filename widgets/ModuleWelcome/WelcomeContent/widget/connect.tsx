import { connect } from 'react-redux';
import { WelcomeContentController } from './controller';
import { IStoreState } from 'types';
import { IDispatch } from 'store';

const mapState = ({ app, profile }: IStoreState) => ({
  welcomeVisible: app.welcomeVisible,
  profileData: profile,
});

const mapDispatch = ({ app, bookingOrders }: IDispatch) => ({
  toggleWelcomeVisible: app.toggleWelcomeVisible,
  getOrders: bookingOrders.pushOrders,
});

export const WelcomeContentConnect = connect(mapState, mapDispatch)(WelcomeContentController);
