import React, {
  memo,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  ReactChild,
} from 'react';
import {
  Dimensions,
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  ScrollView,
  PanResponder,
} from 'react-native';
import { Palette, setAlpha } from 'theme';
import { Close } from 'ui';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export enum SNAPS {
  HIDDEN = 0,
  VISIBLE_SEMI = 1,
  VISIBLE_FULL = 2,
}

interface IProps {
  currentState?: SNAPS;
  setSnap?: (snap: SNAPS) => void;
  children?: ReactChild;
}

const touchThreshold = 20;

const Component = function ({
  currentState = SNAPS.HIDDEN,
  setSnap = () => null,
  children = undefined,
}: IProps) {
  const transitionAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          const { dy } = gestureState;

          return Math.abs(dy) > touchThreshold;
        },
        onPanResponderGrant: () => {
          transitionAnim.extractOffset();
        },
        onPanResponderMove: Animated.event([null, { dy: transitionAnim }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, state) => {
          if (state.vy < 0 && currentState === SNAPS.VISIBLE_FULL) {
            return Animated.spring(transitionAnim, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
          if (
            state.vy < 0 &&
            Math.abs(state.dy) > touchThreshold &&
            currentState !== SNAPS.VISIBLE_FULL
          ) {
            setSnap(SNAPS.VISIBLE_FULL);

            return transitionAnim.flattenOffset();
          }
          if (state.vy > 0) {
            setSnap(SNAPS.HIDDEN);

            return transitionAnim.flattenOffset();
          }
        },
      }),
    [currentState, setSnap, transitionAnim],
  );

  useEffect(() => {
    if (currentState === SNAPS.HIDDEN) {
      Animated.timing(transitionAnim, {
        toValue: HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    if (currentState === SNAPS.VISIBLE_SEMI) {
      Animated.timing(transitionAnim, {
        toValue: -styles.semi.height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    if (currentState === SNAPS.VISIBLE_FULL) {
      Animated.timing(transitionAnim, {
        toValue: -HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [currentState, transitionAnim]);

  const snapToInitial = useCallback(() => {
    setSnap(SNAPS.HIDDEN);
  }, [setSnap]);

  const snapToFull = useCallback(() => {
    setSnap(SNAPS.VISIBLE_FULL);
  }, [setSnap]);

  const isHidden = useMemo(() => currentState === SNAPS.HIDDEN, [currentState]);

  const isFull = useMemo(() => currentState === SNAPS.VISIBLE_FULL, [
    currentState,
  ]);

  const overlayStyles = useMemo(
    () => (isHidden ? [styles.overlay, styles.overlayHidden] : styles.overlay),
    [isHidden],
  );

  return (
    <View style={overlayStyles}>
      <TouchableWithoutFeedback
        style={styles.emptyView}
        onPress={snapToInitial}>
        <View style={styles.emptyView} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.box, { transform: [{ translateY: transitionAnim }] }]}
        {...panResponder.panHandlers}>
        {isFull ? (
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={snapToInitial}>
              <View style={styles.closeButton}>
                <Close />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
        <ScrollView>
          <TouchableWithoutFeedback onPress={snapToFull}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: setAlpha(Palette.secondary, 0.2),
  },
  overlayHidden: {
    top: HEIGHT,
  },
  emptyView: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    position: 'absolute',
    zIndex: 1,
    bottom: -HEIGHT,
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: Palette.primary,
    borderRadius: 5,
  },
  semi: {
    height: 312,
  },
  closeButton: {
    width: 24,
    height: 24,
  },
  header: {
    width: '100%',
    height: 56,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Palette.primaryDark,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export const BottomSheet = memo(Component);
