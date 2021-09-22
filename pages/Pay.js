import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Text from '../components/Text';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BackArrow from '../components/BackArrow';
import Icon from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';

import firebase from '@react-native-firebase/app';

import LinearGradient from 'react-native-linear-gradient';
import {User} from './User';

function Pay({navigation}) {
  const [scann, setScann] = useState(false);
  const [data, setData] = useState({});
  const [validate, setValidate] = useState(false);
  const {user} = useContext(User);

  const PayCreation = async () => {
    if (data[1] <= user.money) {
      navigation.push('Pin', {
        from: 'Pay',
        to: 'TransactionSuccess',
        toAcc: data[0],
        amount: data[1],
        type: data[2],
        ref: data[3],
        fcmToken: data[4],
      });
    } else {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถทำรายการได้', [
        {text: 'ตกลง', onPress: () => setScann(false)},
      ]);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: wp(100),
          height: hp(100),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 40, right: 20, zIndex: 999}}>
          <Icon name="close" color="white" size={RFPercentage(4)} />
        </TouchableOpacity>
        <RNCamera
          captureAudio={false}
          style={{
            flex: 1,
          }}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={scan => {
            const data = scan.data.split(':');
            if (!scann) {
              if (data[0] !== user.id) {
                setData(data);
                setScann(true);
                setValidate(true);
              } else {
                setScann(true);
                Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถทำรายการได้', [
                  {text: 'ตกลง', onPress: () => setScann(false)},
                ]);
              }
            }
          }}>
          <View
            style={
              {
                // backgroundColor: 'rgba(0,0,0,0.5)',
              }
            }>
            <View
              style={{
                position: 'absolute',
                top: 20,
                padding: 20,
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text color="white" size={3} weight="500">
                {user.lang === 'th' ? 'แสกนจ่าย' : 'Scan to Pay'}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  width: wp(50),
                  height: wp(50),
                  backgroundColor: 'transparent',
                  borderColor: 'white',
                  borderWidth: 5,
                  borderStyle: 'dashed',
                  borderRadius: 20,
                }}></View>
            </View>
            {validate && (
              <TouchableOpacity
                style={{position: 'absolute', bottom: 5, zIndex: 999}}
                onPress={PayCreation}>
                <LinearGradient
                  colors={['#3A7BD5', '#00D2FF']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    width: wp(100),
                    height: 120,
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingVertical: 20,
                    backgroundColor: '#3A7BD5',
                  }}>
                  <Text size={3} color="white" weight="600">
                    {user.lang === 'th' ? 'ชำระเงิน' : 'Checkout'} {data[1]}{' '}
                    {user.lang === 'th' ? 'บาท' : 'Baht'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </RNCamera>
      </SafeAreaView>
    </>
  );
}

export default Pay;
