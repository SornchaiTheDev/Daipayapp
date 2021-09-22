import React from 'react';
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

import LottieView from 'lottie-react-native';

function ConfirmPay({navigation}) {
  return (
    <SafeAreaView
      style={{
        // backgroundColor : "#b1bb2c",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 40 : 50,
      }}>
      <View
        style={{
          padding: 10,
          width: wp(90),
          height: hp(60),
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.15,
          shadowRadius: 10,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text
          style={{textAlign: 'justify'}}
          size={3}
          weight="400"
          color="#414141">
          ยืนยันการจ่ายเงิน
        </Text>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            padding: 10,
            flexDirection: 'column',
          }}>
          <Text
            style={{textAlign: 'justify'}}
            size={2.4}
            weight="400"
            color="#414141">
            จ่ายให้ร้าน
          </Text>
          <Text
            style={{textAlign: 'justify'}}
            size={3}
            weight="700"
            color="#414141">
            ร้านข้าวแกงศรีขวัญ
          </Text>

          <Text
            style={{textAlign: 'justify'}}
            size={2.4}
            weight="400"
            color="#414141">
            จำนวน
          </Text>
          <Text
            style={{textAlign: 'justify'}}
            size={3}
            weight="700"
            color="#414141">
            25 ฿
          </Text>

          <Text
            style={{textAlign: 'justify', marginTop: 20}}
            size={2.4}
            weight="400"
            color="#414141">
            หมายเลขอ้างอิง
          </Text>
          <Text
            style={{textAlign: 'justify'}}
            size={2.6}
            weight="400"
            color="#414141">
            123561235135
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Home')}
        style={{
          marginTop: 100,
          alignSelf: 'center',
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
            marginTop: 50,
            width: wp(90),
            backgroundColor: '#00D2FF',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text color="white" size={2.5}>
            ยืนยัน
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ConfirmPay;
