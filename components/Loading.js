import React, {useState} from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';

import LottieView from 'lottie-react-native';

import LinearGradient from 'react-native-linear-gradient';

import Text from './Text';

function Loading() {
  return (
    <View
      style={{
        width: wp(100),
        height: hp(100),
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 999,
      }}>
      <LinearGradient
        colors={['#3A7BD5', '#00D2FF']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          width: wp(16),
          height: wp(16),
          backgroundColor: '#3A7BD5',
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text>sd</Text> */}
        <LottieView
          source={require('../assets/lottie/loading.json')}
          style={{width: '100%', height: '100%'}}
          autoPlay
          loop
        />
      </LinearGradient>
    </View>
  );
}

export default Loading;
