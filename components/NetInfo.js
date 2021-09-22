import React, {useRef, useEffect, useState} from 'react';
import {SafeAreaView, View, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Text from './Text';

function NetInfo({connected}) {
  const [timeout, setTimeout] = useState(5);
  const fadeAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: -100,
        duration: 500,
        delay: 3000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: wp(100),
        height: hp(10),
        top: fadeAnim,
        zIndex: 999,
        backgroundColor: connected ? 'green' : 'red',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Text size={2} color="white">
        {connected
          ? 'คุณเชื่อมต่ออินเทอร์เน็ตแล้ว'
          : 'คุณไม่ได้เชื่อมต่ออินเทอร์เน็ต'}
      </Text>
    </Animated.View>
  );
}

export default NetInfo;
