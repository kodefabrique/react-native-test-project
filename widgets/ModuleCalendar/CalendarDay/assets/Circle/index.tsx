import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export function Circle() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Rect x="0.5" y="0.499939" width="29" height="29" rx="14.5" stroke="white" />
      <Path d="M0.818359 16.7725H3.47745L1.70472 9.68155L0.818359 13.227V16.7725Z" fill="white" />
      <Path d="M29.1816 15.8861H26.2271L27.4089 22.5338L29.1816 19.4316V15.8861Z" fill="white" />
    </Svg>
  );
}
