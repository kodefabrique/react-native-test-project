import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import {
  AButtonConfirm,
  ALoader,
  ATypography,
  CartEmpty,
  createStyles,
} from 'ui';
import { Palette } from 'theme';
import {
  useDispatch,
  useIsAuthenticated,
  useSelector,
  useIsShoppingCartLoading,
} from 'view/hooks';
import { OModalPromocode } from 'view/components/OModalPromocode';
import { ROUTE_NAME } from 'view/constants';
import { WShoppingCart } from '../WShoppingCart';

interface IProps {
  tabBarHeight?: number;
}

const Component = ({ tabBarHeight = 0 }: IProps) => {
  const { t } = useTranslation('SEARCH_SHOPPING_CART');

  const navigation = useNavigation();

  const [modalPromoIsVisible, setModalPromoIsVisible] = useState(false);

  const AnimIndex = useRef(new Animated.Value(0)).current;

  const { top } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [tabBarHeight, '80%'], [tabBarHeight]);

  const shoppingCart = useSelector((state) => state.searchCore.shoppingCart);

  const bottomSheetType = useSelector(
    (state) => state.searchCore.bottomSheetType,
  );

  const token = useSelector((state) => state.commonApp.token);

  const pushGetShoppingCartAsync = useDispatch(
    (state) => state.searchApp.pushGetShoppingCartAsync,
  );

  const setCheckoutUrl = useDispatch(
    (state) => state.searchCore.setCheckoutUrl,
  );

  const onGoToPurchase = useDispatch(
    (state) => state.metricsApp.onGoToPurchase,
  );

  const isAuthenticated = useIsAuthenticated();

  const isLoadingCart = useIsShoppingCartLoading();

  useEffect(() => {
    // if (shoppingCart.id === 0 && token !== null) {
    pushGetShoppingCartAsync();
    // }
  }, [pushGetShoppingCartAsync, shoppingCart.id, token]);

  const snapToInItialIndex = useCallback(
    () => bottomSheetRef.current?.snapTo(0),
    [],
  );

  const snapToInMaxIndex = useCallback(
    () => bottomSheetRef.current?.snapTo(1),
    [],
  );

  const openPromoModal = useCallback(() => setModalPromoIsVisible(true), []);

  const onPurchaseButtonPress = useCallback(() => {
    const isAllDeparturePointsSelected = shoppingCart?.cards?.every((point) =>
      Boolean(point.stop),
    );
    onGoToPurchase(shoppingCart.id);

    if (isAllDeparturePointsSelected) {
      snapToInItialIndex();

      if (isAuthenticated) {
        setCheckoutUrl('');

        navigation.navigate(ROUTE_NAME.SEARCH_CHECKOUT);
      } else {
        navigation.navigate(ROUTE_NAME.AUTH_MODAL);
      }
    }
  }, [
    isAuthenticated,
    navigation,
    setCheckoutUrl,
    shoppingCart.cards,
    shoppingCart.id,
    snapToInItialIndex,
    onGoToPurchase,
  ]);

  const handleComponent = useCallback(
    () => (
      <View style={styles.handle}>
        {isLoadingCart ? (
          <ALoader size="small" style={styles.loader} color={Palette.primary} />
        ) : (
          <Pressable style={styles.handleItem} onPress={snapToInMaxIndex}>
            <CartEmpty style={styles.cartIcon} />
            <ATypography
              variant="bold"
              size="header_small"
              style={styles.title}>
              {`${shoppingCart.total} ${shoppingCart.cards[0].productInfo.currency}`}
            </ATypography>
          </Pressable>
        )}
      </View>
    ),
    [isLoadingCart, shoppingCart.cards, shoppingCart.total, snapToInMaxIndex],
  );

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop pressBehavior="collapse" {...props} />
    ),
    [],
  );

  const toSelections = useCallback(() => {
    snapToInItialIndex();

    navigation.navigate(ROUTE_NAME.SEARCH_TAB);
  }, [navigation, snapToInItialIndex]);

  const [countItems, setCountItems] = useState(0);

  useEffect(() => {
    if (countItems < shoppingCart.cards.length) {
      snapToInMaxIndex();
    }

    setCountItems(shoppingCart.cards.length);
  }, [countItems, shoppingCart.cards.length, snapToInMaxIndex]);

  if (
    (shoppingCart.cards.length === 0 && !isLoadingCart) ||
    bottomSheetType !== 'cart'
  ) {
    return null;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      animatedIndex={AnimIndex}
      topInset={top}
      backdropComponent={Backdrop}
      handleComponent={handleComponent}>
      <View style={[styles.contentContainer, { paddingBottom: tabBarHeight }]}>
        <Animated.View
          style={[
            styles.subHandle,
            {
              opacity: AnimIndex.interpolate({
                inputRange: [0, 0.1],
                outputRange: [1, 0],
              }),
              height: AnimIndex.interpolate({
                inputRange: [0, 1],
                outputRange: [styles.subHandle.height, 0],
              }),
            },
          ]}
        />
        <BottomSheetScrollView style={styles.cardsList}>
          <WShoppingCart
            onCatalogPress={snapToInItialIndex}
            onPromoPress={openPromoModal}
            isLoading={isLoadingCart}
          />
        </BottomSheetScrollView>
        <View style={styles.footerActions}>
          <AButtonConfirm
            style={[styles.footerButton, styles.footerButtonGrey]}
            onPress={toSelections}>
            <ATypography
              variant="medium"
              size="body_medium"
              style={[styles.footerButtonText, styles.footerButtonTextGrey]}>
              {t('GO_TO_THE_SELECTION')}
            </ATypography>
          </AButtonConfirm>
          <AButtonConfirm
            style={styles.footerButton}
            onPress={onPurchaseButtonPress}>
            <ATypography
              variant="medium"
              size="body_medium"
              style={[styles.footerButtonText, styles.footerButtonTextWhite]}>
              {t('PURCHASE')}
            </ATypography>
          </AButtonConfirm>
        </View>
      </View>
      <OModalPromocode
        isVisible={modalPromoIsVisible}
        setIsVisible={setModalPromoIsVisible}
      />
    </BottomSheet>
  );
};

const styles = createStyles({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  cardsList: {
    flex: 1,
    backgroundColor: Palette.primaryDark,
  },
  handle: {
    flexDirection: 'row',
    backgroundColor: Palette.accentSecondary,
    height: 44,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: 24,
    height: 24,
    color: Palette.primary,
    marginRight: 8,
  },
  title: {
    color: Palette.primary,
  },
  subHandle: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    backgroundColor: Palette.accentSecondary,
    height: 56,
    width: '100%',
  },
  loader: {
    backgroundColor: 'transparent',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 67,
    paddingHorizontal: 20,
    paddingVertical: 9.5,
    backgroundColor: Palette.primary,
  },
  footerButton: {
    width: 160,
  },
  footerButtonGrey: {
    backgroundColor: Palette.primaryDark,
  },
  footerButtonText: {
    flex: 1,
    textAlign: 'center',
  },
  footerButtonTextGrey: {
    color: Palette.primaryDarkest,
  },
  footerButtonTextWhite: {
    color: Palette.primary,
  },
});

export const WBottomSheetShoppingCart = memo(Component);
