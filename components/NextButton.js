import React, {createRef, useContext} from 'react';
import {View, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import Text from './Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const navigationRef = createRef();

import {User} from '../pages/User';

const NextButton = ({to}) => {
  const {user} = useContext(User);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigationRef.current?.navigate(to)}
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 6,
        shadowOpacity: 0.2,
      }}>
      <LinearGradient
        colors={['#00D2FF', '#3A7BD5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          marginTop: 10,
          width: wp(50),
          backgroundColor: '#00D2FF',
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text color="white" size={2}>
          {user.lang === 'th' ? 'ถัดไป' : 'Next'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NextButton;
