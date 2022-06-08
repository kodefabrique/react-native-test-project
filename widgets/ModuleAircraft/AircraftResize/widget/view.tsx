import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { styles, calcImageStyle } from './styles';

interface IOwnProps {
  img: string;
  isFullScreen: boolean;
  fullScreenToggle?: (value: boolean) => void;
}

export function AircraftResizeView({ img, isFullScreen }: IOwnProps) {
  const [scale, setScale] = useState(1);

  // const fullScreen = useCallback(() => fullScreenToggle(!isFullScreen), [fullScreenToggle, isFullScreen]);

  const getScale = useCallback(
    () =>
      Image.getSize(
        img,
        (width, height) => setScale(height / width),
        () => setScale(1)
      ),
    [img, setScale]
  );

  const imageStyle = useMemo(() => calcImageStyle(scale), [scale]);

  useEffect(() => {
    getScale();
  }, [getScale]);

  return (
    <View style={isFullScreen ? styles.imageDiv : styles.div}>
      <Image source={{ uri: img }} style={isFullScreen ? styles.aircraftFullScreen : imageStyle} />

      {/* <Deprecated_SharedFullScreen fullScreen={fullScreen} isBtnExit={isFullScreen} /> */}
    </View>
  );
}
