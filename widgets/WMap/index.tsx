import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ISearchExcursionStopCore } from 'core';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from 'theme';

import {
  createStyles,
  AMap,
  AMapMarker,
  ATypography,
  AMapButton,
  IncreaseAction,
  ReduceAction,
  RouteToggler,
} from 'ui';
import { MARKER_TYPE } from 'ui/atoms/AMapMarker';
import { ChooseMapAppModal } from 'view/components/ChooseMapAppModal';
import { ROUTE_NAME } from 'view/constants';

export type TPinMap = {
  latitude: number;
  longitude: number;
  type: MARKER_TYPE;
  selected: boolean;
  data: {
    entityId: number;
    orderId: number;
    title?: string;
  };
  city?: string;
};

interface IProps extends MapViewProps {
  pins?: TPinMap[];
  onMarker?: (pin?: TPinMap, index?: number) => void;
  isFullScreen?: boolean;
  showFullScreenActionButton?: boolean;
  showDirectionsActionButton?: boolean;
  showPinTitle?: boolean;
  markerMode?: 'static' | 'dynamic';
  initialArea?: ISearchExcursionStopCore;
}

const calcZoomForPins = function (pinType: MARKER_TYPE) {
  switch (pinType) {
    case 'FLIGHT':
      return 9;

    default:
      return 15;
  }
};

const calcAltitudeForPins = function (pinType: MARKER_TYPE) {
  switch (pinType) {
    case 'FLIGHT':
      return 100000;
    default:
      return 2500;
  }
};

const Component = function ({
  style = {},
  pins = [],
  isFullScreen = false,
  showFullScreenActionButton = true,
  showDirectionsActionButton = true,
  showPinTitle = true,
  onMarker = (pin) => pin,
  markerMode,
  showsUserLocation = true,
  initialArea,
  ...restProps
}: IProps) {
  const containerMapStyles = useMemo(() => [styles.map, style], [style]);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const mapRef = useRef<MapView>(null);

  const [pressedPin, setPin] = useState<TPinMap>();

  const [routeModal, setRouteModal] = useState(false);

  const fitMarker = useCallback((pinData?: TPinMap) => {
    if (mapRef?.current && pinData) {
      setTimeout(
        () =>
          mapRef.current?.animateCamera(
            {
              center: {
                latitude: pinData.latitude,
                longitude: pinData.longitude,
              },
              altitude: calcAltitudeForPins(pinData.type),
              zoom: calcZoomForPins(pinData.type),
            },
            { duration: 1000 },
          ),
        1,
      );
    }
  }, []);

  useEffect(() => {
    if (pins.length > 0 && pins.every((pin) => !pin.selected)) {
      if (mapRef?.current) {
        setTimeout(
          () =>
            mapRef.current?.fitToSuppliedMarkers(
              pins.map((coord) => `${coord.latitude}${coord.longitude}`),
              {
                edgePadding: {
                  top: 100,
                  bottom: 100,
                  left: 100,
                  right: 100,
                },
              },
            ),
          1,
        );
      }
    }
  }, [pins]);

  useEffect(() => {
    if (pins.length === 0 && initialArea !== undefined) {
      if (mapRef?.current) {
        setTimeout(
          () =>
            mapRef.current?.animateCamera(
              {
                center: {
                  latitude: Number(initialArea.latitude),
                  longitude: Number(initialArea.longitude),
                },
                altitude: 500000,
                zoom: 7,
              },
              { duration: 1000 },
            ),
          1,
        );
      }
    }
  }, [fitMarker, initialArea, pins]);

  useEffect(() => {
    if (pins.some((pin) => pin.selected)) {
      const selectedPin = pins.find((pin) => pin.selected);

      fitMarker(selectedPin);
    }
  }, [fitMarker, pins]);

  const testPressMarker = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.action === 'marker-press') {
        const selectedPin = pins.find(
          (pin) =>
            nativeEvent.coordinate.latitude === pin.latitude &&
            nativeEvent.coordinate.longitude === pin.longitude,
        );

        if (selectedPin) {
          const index = pins.indexOf(selectedPin);

          setPin(selectedPin);

          onMarker(selectedPin, index);

          fitMarker(selectedPin);
        }
      }
    },
    [fitMarker, onMarker, pins],
  );

  const selectedPinTitle = useMemo(
    () => pins.find((pin) => pin.selected)?.data.title,
    [pins],
  );

  const toFullScreenMap = () => {
    if (isFullScreen) {
      return navigation.goBack();
    }
    navigation.navigate(ROUTE_NAME.MAP_FULLSCREEN, {
      pins,
    });
  };

  const getNavigateFromMaps = () => {
    setRouteModal(!routeModal);
  };

  const { top } = useSafeAreaInsets();

  const titlePinStyle = useMemo(
    () =>
      isFullScreen
        ? [styles.titleWrapper, styles.topMargin]
        : styles.titleWrapper,
    [isFullScreen],
  );

  const destination = useMemo(() => pressedPin || pins[0], [pins, pressedPin]);

  return (
    <View style={styles.container}>
      <View style={[styles.mapActions, { top: styles.mapActions.top + top }]}>
        {showFullScreenActionButton && (
          <AMapButton onPress={toFullScreenMap} style={styles.butttonMargin}>
            {isFullScreen ? <ReduceAction /> : <IncreaseAction />}
          </AMapButton>
        )}

        {showDirectionsActionButton && (
          <AMapButton
            onPress={getNavigateFromMaps}
            style={styles.buttonDirection}>
            <RouteToggler />
          </AMapButton>
        )}
      </View>

      <AMap
        {...restProps}
        maxZoomLevel={18}
        style={containerMapStyles}
        showsUserLocation={showsUserLocation}
        ref={mapRef}>
        {isFocused &&
          pins.map((item, index) => {
            const idetifer = `${item.latitude}${item.longitude}`;

            const key = `${item.latitude}${item.longitude}${item.type}${index}`;

            return (
              <AMapMarker
                type={item.type}
                identifier={idetifer}
                selected={item.selected}
                key={key}
                coordinate={item}
                onPress={testPressMarker}
                markerMode={markerMode}
              />
            );
          })}
      </AMap>
      {showPinTitle && selectedPinTitle && (
        <View style={titlePinStyle}>
          <ATypography style={styles.title}>{selectedPinTitle}</ATypography>
        </View>
      )}
      <ChooseMapAppModal
        close={getNavigateFromMaps}
        isModalVisible={routeModal}
        destination={destination}
      />
    </View>
  );
};

export const WMap = memo(Component);

const styles = createStyles({
  container: {
    position: 'relative',
    flex: 1,
  },
  map: {
    width: '100%',
    height: 249,
  },
  mapActions: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  butttonMargin: {
    marginBottom: 16,
  },
  buttonDirection: {
    backgroundColor: Palette.accentPrimary,
  },
  titleWrapper: {
    position: 'absolute',
    backgroundColor: Palette.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    top: 5,
  },
  topMargin: {
    top: 47,
    left: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
