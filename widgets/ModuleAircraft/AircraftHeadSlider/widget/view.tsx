import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { TemplateSlider } from 'templates';
import { styles } from './styles';

interface IOwnProps {
  slides: string[];
  isFullScreen: boolean;
  fullScreenToggle?: (value: boolean) => void;
}

const AUTO_DELAY = 3000;

export function Widget({ slides, isFullScreen }: IOwnProps) {
  const images = useMemo(() => slides.map((slide) => ({ image: slide, link: null })), [slides]);

  // const toggglerFullScreen = useCallback(() => {
  //   fullScreenToggle(!isFullScreen);
  // }, [isFullScreen, fullScreenToggle]);

  const imageStyle = useMemo(() => (isFullScreen ? styles.imageFull : styles.image), [isFullScreen]);

  return (
    <View style={isFullScreen ? styles.sliderFullScreen : styles.mainSliderDiv}>
      <TemplateSlider images={images} delay={AUTO_DELAY} imageStyle={imageStyle} />

      {/* <Deprecated_SharedFullScreen fullScreen={toggglerFullScreen} isBtnExit={isFullScreen} /> */}
    </View>
  );
}

export const AircraftHeadSliderView = memo(Widget);
