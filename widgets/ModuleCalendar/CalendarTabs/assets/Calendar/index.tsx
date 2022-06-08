import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Calendar() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM7 11V13H9V11H7ZM13 11H11V13H13V11ZM17 11V13H15V11H17ZM5 20H19V9H5V20Z"
        fill="#B6B6B6"
      />
    </Svg>
  );
}
