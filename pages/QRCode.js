import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';

import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import BackArrow from '../components/BackArrow';

import QRCodeSVG from 'react-native-qrcode-svg';

import {User} from './User';

function QRCode({navigation, route}) {
  const [validate, setValidate] = useState(false);
  const {amount} = route.params;
  const {user} = useContext(User);
  // const user = '1010120010';
  const date = new Date();
  useEffect(() => {
    // console.log(
    //   `${user}:${route.params.amount}:${date.getDate()}0${
    //     date.getMonth() + 1
    //   }${date.getFullYear()}`.split(':'),
    // );
  }, []);
  return (
    <>
      <BackArrow />
      <ScrollView>
        <View
          style={{
            // backgroundColor : "#b1bb2c",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 10,
              width: wp(90),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20%',
            }}>
            <Text
              style={{textAlign: 'justify'}}
              size={3}
              weight="600"
              color="#414141">
              {user.lang === 'th'
                ? 'QRCode สำหรับเติมเงิน'
                : 'QRCode Use For Topup'}
            </Text>
            <Text style={{lineHeight: 30}} size={2} color="#414141">
              {user.lang === 'th'
                ? 'นำ QRCode ไปแสกนที่จุดเติมเงิน'
                : 'Bring this QR Code to Topup Station'}
            </Text>
          </View>

          <View
            style={{
              //   margin: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginVertical: 20,
            }}>
            <QRCodeSVG
              value={`${user.id}:${amount}:103:${date.getTime()}:${
                user.fcmToken
              }`}
              size={wp(70)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Home')}
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 6,
              shadowOpacity: 0.2,
              marginTop: 30,
            }}>
            <LinearGradient
              colors={['#00D2FF', '#3A7BD5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                marginTop: 10,
                width: wp(50),
                height: 50,
                backgroundColor: '#00D2FF',
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text color="white" size={2}>
                {user.lang === 'th' ? 'ปิด' : 'Close'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

export default QRCode;
