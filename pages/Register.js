import React, {useState, useEffect, createRef, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NextButton from '../components/NextButton';
import {RFPercentage} from 'react-native-responsive-fontsize';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import firebase from '@react-native-firebase/app';

import Dismiss from '../components/Dismiss';

import Pin from 'react-native-smooth-pincode-input';

import Loading from '../components/Loading';

import {User} from './User';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({navigation}) {
  const [phoneNum, setPhoneNum] = useState('');
  const [otp, setOtp] = useState('');
  const [validate, setValidate] = useState(false);
  const [recieveOtp, setRecieveOtp] = useState(false);
  const [cooldown, setCoolDown] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useContext(User);

  useEffect(() => {
    phoneNum !== '' && phoneNum.length === 10
      ? setValidate(true)
      : setValidate(false);
  }, [phoneNum, otp]);

  const PinRef = createRef();

  useEffect(() => {
    const countdown = setTimeout(() => {
      recieveOtp && cooldown > 0 && setCoolDown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [cooldown]);

  const OTPRequest = async () => {
    setIsLoading(true);
    if (!recieveOtp) {
      phoneNum.length === 10 && setRecieveOtp(true);

      await firebase
        .app()
        .functions('asia-south1')
        .httpsCallable('requestOtp')({to: `+66${phoneNum}`})
        .then(verify => (setRecieveOtp(true), setIsLoading(false)))
        .catch(err => console.log(err));
    }
    // else {
    //   if (true) {
    //     navigation.navigate('Create');
    //   } else {
    //     navigation.navigate('Pin');
    //   }
    // }
    else {
      await firebase
        .app()
        .functions('asia-south1')
        .httpsCallable('validateOtp')({to: `+66${phoneNum}`, code: otp})
        .then(async res => {
          const {status, token} = res.data;

          if (status === 'wrongotp') {
            alert('OTP ไม่ถูกต้อง');
            setIsLoading(false);
            setOtp('');
            return;
          }

          if (status === 'success/alreadyexist') {
            setUser(prev => ({
              ...prev,
              id: `66${phoneNum}`,
              register: true,
            }));
            await AsyncStorage.setItem('id', `66${phoneNum}`);
            await AsyncStorage.setItem('register', 'true');

            navigation.navigate('HomePin');
          }

          if (status === 'error/namenotdefined') {
            await auth()
              .signInWithCustomToken(token)
              .then(async ({user}) => {
                setUser(prev => ({
                  ...prev,
                  id: user.uid,
                }));
                await AsyncStorage.setItem('id', user.uid);
                navigation.navigate('Create');
              });
          }

          if (status === 'error/pinnotset') {
            await auth()
              .signInWithCustomToken(token)
              .then(async ({user}) => {
                setUser(prev => ({
                  ...prev,
                  id: user.uid,
                }));
                await AsyncStorage.setItem('id', user.uid);
                navigation.navigate('CreatePin');
              });
          }

          if (status === undefined && token !== undefined) {
            await auth()
              .signInWithCustomToken(token)
              .then(async ({user}) => {
                await firebase
                  .app()
                  .functions('asia-south1')
                  .httpsCallable('createUser')({uid: user.uid})
                  .then(async res => {
                    setIsLoading(false);
                    setUser(prev => ({
                      ...prev,
                      id: user.uid,
                    }));
                    await AsyncStorage.setItem('id', user.uid);
                    navigation.replace('Create');
                  })
                  .catch(err => alert('มีข้อผิดพลาดเกิดขึ้น'));
              });
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    otp.length === 6 && OTPRequest();
  }, [otp]);

  return (
    <>
      {isLoading && <Loading />}
      <Dismiss>
        <SafeAreaView
          style={{
            // backgroundColor : "#b1bb2c",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: '50%',
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
              {user.lang === 'th' ? 'สมัครสมาชิก' : 'Register'}
            </Text>
            <Text style={{lineHeight: 30}} size={2} color="#414141">
              {user.lang === 'th'
                ? !recieveOtp
                  ? 'ใช้เบอร์โทรศัพท์เพื่อสมัครสมาชิก'
                  : 'ป้อนรหัส OTP ที่ได้รับ'
                : !recieveOtp
                ? 'Use Your Phone To Register'
                : 'Enter OTP'}
            </Text>
          </View>
          <View
            style={{
              margin: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'relative',
              }}>
              {!recieveOtp && (
                <TextInput
                  keyboardType="number-pad"
                  placeholderTextColor="#878797"
                  style={{
                    color: 'black',
                    minWidth: wp(75),
                    height: wp(18),
                    borderColor: '#CDCDCD',
                    borderWidth: 1,
                    padding: 20,
                    fontSize: RFPercentage(3.5),
                    backgroundColor: '#F4F4F4',
                    borderRadius: 20,
                    fontFamily: 'Kanit-Regular',
                    margin: 10,
                  }}
                  value={phoneNum}
                  onChangeText={text => {
                    if (/^\d+$/.test(text) || text === '') setPhoneNum(text);
                  }}
                  placeholder={
                    user.lang === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'
                  }
                />
              )}
            </View>

            {recieveOtp && (
              <Pin
                cellStyle={{
                  width: wp(10),
                  borderWidth: 2,
                  padding: 6,
                  borderRadius: 6,
                  borderColor: 'lightgrey',
                }}
                cellStyleFocused={{
                  borderColor: 'black',
                }}
                keyboardType="number-pad"
                // autoFocus={true}
                animated={false}
                codeLength={6}
                value={otp}
                onTextChange={code => {
                  if (/^\d+$/.test(code) || code === '') setOtp(code);
                }}
              />
            )}

            {/* <TextInput
            keyboardType="decimal-pad"
            placeholderTextColor="#878797"
            style={{
              color: 'black',
              display: recieveOtp ? 'flex' : 'none',
              minWidth: wp(75),
              height: wp(18),
              borderColor: '#CDCDCD',
              borderWidth: 1,
              padding: 20,
              fontSize: RFPercentage(3.5),
              backgroundColor: '#F4F4F4',
              borderRadius: 20,
              fontFamily: 'Kanit-Regular',
              margin: 10,
            }}
            placeholder="OTP"
            value={otp}
            onChangeText={text => setOtp(text)}
          /> */}
          </View>
          {!recieveOtp && (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={phoneNum.length < 10}
              onPress={OTPRequest}
              style={{
                // backgroundColor : "black",
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 6,
                shadowOpacity: 0.2,
              }}>
              <LinearGradient
                colors={
                  !validate ? ['#CDCDCD', '#CDCDCD'] : ['#00D2FF', '#3A7BD5']
                }
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
                  {user.lang === 'th' ? 'ขอ OTP' : 'Get Otp'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </Dismiss>
    </>
  );
}

export default Register;
