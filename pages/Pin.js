import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, Platform, Alert} from 'react-native';
import Text from '../components/Text';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';

import PinInput from 'react-native-smooth-pincode-input';
import LinearGradient from 'react-native-linear-gradient';

import {User} from './User';
import {navigationRef} from '../components/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackArrow from '../components/BackArrow';
import {useIsFocused} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import Loading from '../components/Loading';

//firebase
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const Pin = ({navigation, route}) => {
  const [pin, setPin] = useState('');
  const [validate, setValidate] = useState(false);
  const {user, setUser} = useContext(User);
  const [isLoading, setIsLoading] = useState(false);

  const {from, to, toAcc, amount, toUser, type, fcmToken, ref} =
    route.params || 'Home';

  const focus = useIsFocused();

  const pinValidate = async () => {
    setIsLoading(true);
    if (validate) {
      const verify = await firebase
        .app()
        .functions('asia-south1')
        .httpsCallable('PinVerify')({pin: pin, user: user.id});

      if (verify.data) {
        setUser(prev => ({...prev, isLogined: true}));
        if (from === 'Pay') {
          await Pay({
            from: user.id,
            to: to,
            toAcc: toAcc,
            amount: amount,
            type: type,
            user: user,
            fcmToken: fcmToken,
            ref: ref,
          });
          setIsLoading(false);
          setPin('');
          return;
        }
        if (from === 'Transfer') {
          await Transfer({
            from: user.id,
            to: to,
            toAcc: toAcc,
            toUser: toUser,
            amount: amount,
            user: user,
            fcmToken: fcmToken,
          });
          setIsLoading(false);
          setPin('');
          return;
        }
        await AsyncStorage.setItem('register', 'true');
        setUser(prev => ({...prev, first: true}));
        from !== undefined && navigation.replace(to);

        // navigation.replace(to || 'Home', {from: 'Pin'});
        setPin('');
      } else {
        setIsLoading(false);
        alert('Pin ผิด');
        setPin('');
        setValidate(false);
      }
    }
  };

  useEffect(() => {
    pin.length === 6 && pinValidate();
    !focus && setPin('');
  }, [pin]);

  useEffect(() => {
    const checkValidPin = async () => {
      setIsLoading(true);
      const getPin = await firestore().collection('users').doc(user.id).get();
      if (getPin.data().name === '') {
        setIsLoading(false);
        navigation.replace('Create');
        return;
      }
      if (getPin.data().pin === '') {
        setIsLoading(false);
        navigation.replace('CreatePin');
        return;
      }
      setIsLoading(false);
    };
    user.name === '' || (user.token === '' && checkValidPin());
  }, []);

  const getPermission = async () => {
    const request = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Confirm Biometrics',
    });

    if (request.success) {
      setIsLoading(true);
      setUser(prev => ({...prev, isLogined: true}));
      if (from === 'Pay') {
        await Pay({
          from: user.id,
          to: to,
          toAcc: toAcc,
          amount: amount,
          type: type,
          user: user,
          fcmToken: fcmToken,
        });
        setIsLoading(false);
        setPin('');
        return;
      }
      if (from === 'Transfer') {
        await Transfer({
          from: user.id,
          to: to,
          toAcc: toAcc,
          toUser: toUser,
          amount: amount,
          user: user,
          fcmToken: fcmToken,
        });
        setIsLoading(false);
        setPin('');
        return;
      }
      await AsyncStorage.setItem('register', 'true');

      from !== undefined && navigation.replace(to);
      setPin('');
    }
  };

  useEffect(() => {
    user.biometric === 'on' && getPermission();

    // console.log(user.biometric);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {from !== undefined && <BackArrow to={from} />}
      <SafeAreaView style={{marginTop: Platform.OS === 'android' ? 40 : 0}}>
        <View>
          <View
            style={{
              padding: 10,
              width: wp(100),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '25%',
            }}>
            <View
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{textAlign: 'justify'}}
                size={3}
                weight="600"
                color="#414141">
                {user.lang === 'th' ? 'ใส่ Pin ของคุณ' : 'Enter Your Pin'}
              </Text>
            </View>
            <View style={{margin: 40}}>
              <PinInput
                codeLength={6}
                cellStyle={null}
                cellStyleFocused={null}
                password={true}
                placeholder={
                  <View
                    style={{
                      width: wp(8),
                      height: wp(8),
                      borderRadius: 50,
                      backgroundColor: 'lightgrey',
                    }}
                  />
                }
                mask={
                  <LinearGradient
                    colors={['#3A7BD5', '#00D2FF']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: wp(8),
                      height: wp(8),
                      borderRadius: 50,
                      backgroundColor: '#3A7BD5',
                    }}
                  />
                }
                animated={false}
                maskDelay={0}
                autoFocus={true}
                value={pin}
                keyboardType="number-pad"
                onTextChange={value => {
                  if (/^\d+$/.test(value) || value === '') setPin(value);
                }}
                onFulfill={() => setValidate(true)}
              />
            </View>
            {user.biometric === 'on' && (
              <TouchableOpacity
                onPress={getPermission}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 50,
                  padding: 2,
                }}>
                <Icon
                  name="key"
                  size={RFPercentage(2)}
                  color="black"
                  style={{margin: 10}}
                />
                <Text size={2} style={{margin: 10}}>
                  {user.lang === 'th'
                    ? 'แสกนนิ้วมือ/ใบหน้า'
                    : 'Fingerprint / FaceId'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Pin;

const Pay = async ({from, to, toAcc, amount, type, fcmToken, user, ref}) => {
  await firebase
    .app()
    .functions('asia-south1')
    .httpsCallable('Transaction')({
      from: from,
      to: toAcc,
      amount: amount,
      type: parseInt(type),
      ref: ref,
      fcmToken: fcmToken,
      lang: user.lang,
    })
    .then(verify =>
      navigationRef.current?.navigate(to, {
        type: parseInt(type),
        amount: amount,
        ref: ref,
      }),
    )
    .catch(err =>
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถทำรายการได้', [
        {text: 'ตกลง', onPress: () => navigationRef.current?.navigate('Home')},
      ]),
    );
};

const Transfer = async ({from, to, toUser, toAcc, amount, fcmToken, user}) => {
  const ref = new Date().getTime();

  await firebase
    .app()
    .functions('asia-south1')
    .httpsCallable('Transaction')({
      from: from,
      to: toAcc,
      amount: amount,
      type: 100,
      ref: ref,
      fcmToken: fcmToken,
      lang: user.lang,
    })
    .then(verify =>
      navigationRef.current?.navigate(to, {
        toUser: toUser,
        amount: amount,
        type: 'transfer',
        ref: ref,
      }),
    )
    .catch(err => console.log(err));
};
