import React, {createRef, useContext, useEffect, useState} from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NextButton from '../components/NextButton';

import Icon from 'react-native-vector-icons/AntDesign';

import {User} from './User';

function HowToUse() {
  const {user, setUser} = useContext(User);

  const feature = [
    {text: user.lang === 'th' ? 'เติมเงิน' : 'Topup', icon: 'bank'},
    {text: user.lang === 'th' ? 'โอนเงิน' : 'Transfer', icon: 'swap'},
    {text: user.lang === 'th' ? 'แสกนจ่าย' : 'QR Pay', icon: 'qrcode'},
  ];
  return (
    <SafeAreaView
      style={{
        // backgroundColor : "#b1bb2c",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: Platform.OS === 'android' ? 40 : 50,
      }}>
      <View
        style={{
          marginTop: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {feature.map(({text, icon}) => (
          <View
            key={text}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <LinearGradient
              colors={['#00D2FF', '#3A7BD5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                margin: 6,
                width: wp(20),
                height: wp(20),
                backgroundColor: '#b1bb2c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Icon name={icon} size={28} color="white" />
            </LinearGradient>
            <Text style={{margin: 6}} size={3} weight="600">
              {text}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          padding: 10,
          width: wp(90),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{textAlign: 'justify'}}
          size={3}
          weight="600"
          color="#414141">
          {user.lang === 'th' ? 'บัตรสามารถทำอะไรได้บ้าง' : 'What you can do ?'}
        </Text>
        <Text style={{lineHeight: 30}} size={2} color="#414141">
          {/* แต่ยังสามารถใช้สะสมแต้ม แล้วไฮไลต์เลยคือบัตรสามารถแต่งตามใจได้เลย */}
          {user.lang === 'th'
            ? 'หลักๆมีฟีเจอร์อยู่ 3 อย่างคือ เติมเงิน โอนเงิน แล้วก็แสกนจ่าย'
            : 'There are 3 main feature Topup , Transfer , and QR Code Pay'}
        </Text>
      </View>
      <NextButton to="Register" />
    </SafeAreaView>
  );
}

export default HowToUse;
