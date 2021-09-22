import React from 'react';
import {Text, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize'
function CustomText({
  children,
  size = Platform.OS === 'ios' ? 4 : 2,
  color = 'black',
  style,
  weight = 'normal',
}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'Kanit-Regular',
          fontSize: RFPercentage(size),
          color: color,
          fontWeight: weight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export default CustomText;
