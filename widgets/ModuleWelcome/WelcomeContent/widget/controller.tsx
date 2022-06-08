import React, { Component } from 'react';
import { Easing, Animated } from 'react-native';
import { IProfileState } from 'types';
import { WelcomeContentView } from './view';

interface IConnectProps {
  welcomeVisible: boolean;
  toggleWelcomeVisible: (status: boolean) => void;
  profileData: IProfileState;
  getOrders: () => void;
}

interface IState {
  animationTranslateY: Animated.Value;
}

export class WelcomeContentController extends Component<IConnectProps, IState> {
  state: IState = {
    animationTranslateY: new Animated.Value(0),
  };

  componentDidUpdate() {
    const { welcomeVisible } = this.props;
    if (welcomeVisible) {
      this.showWelcome();
    }
  }

  showWelcome = () => {
    const { animationTranslateY } = this.state;
    const { getOrders } = this.props;
    getOrders();
    setTimeout(() => {
      Animated.timing(animationTranslateY, {
        toValue: 300,
        easing: Easing.elastic(1),
        duration: 500,
      }).start();
      this.hideWelcome();
    }, 500);
  };

  hideWelcome = () => {
    const { animationTranslateY } = this.state;
    const { toggleWelcomeVisible } = this.props;
    setTimeout(() => {
      Animated.timing(animationTranslateY, {
        toValue: 0,
        easing: Easing.cubic,
        duration: 500,
      }).start(() => {
        toggleWelcomeVisible(false);
      });
    }, 2000);
  };

  getNamesOrEmail = () => {
    const { profileData } = this.props;
    if (profileData?.data?.firstName || profileData?.data?.lastName) {
      const formatedWelcomeUserName = `${profileData.data.lastName}` + ' ' + `${profileData.data.firstName}`;
      return formatedWelcomeUserName;
    }
    if (profileData?.data?.email) {
      return profileData.data?.email;
    }
    return '';
  };

  render() {
    const { animationTranslateY } = this.state;
    const { welcomeVisible } = this.props;
    const welcomeUserName = this.getNamesOrEmail();

    return (
      <WelcomeContentView
        userName={welcomeUserName}
        animationTranslateY={animationTranslateY}
        welcomeVisible={welcomeVisible}
      />
    );
  }
}
