import React from 'react';
import Svg, { Path, G, Rect } from 'react-native-svg';

export function Graph() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G>
        <Rect width="24" height="24" fill="none" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 20V9H20V20H16Z"
          fill="#B6B6B6"
        />
      </G>
    </Svg>
  );
}
