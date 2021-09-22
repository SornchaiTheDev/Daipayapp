import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, View, Platform} from 'react-native';
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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import Loading from '../components/Loading';

const CreatePin = ({navigation, route}) => {
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useContext(User);
  const {from} = route.params || '';

  useEffect(() => {
    const PinCreate = async () => {
      if (validate) {
        setIsLoading(true);
        if (pin === confirm) {
          await firebase
            .app()
            .functions('asia-south1')
            .httpsCallable('PinCreate')({pin: pin, user: user.id})
            .then(async result => {
              setIsLoading(false);
              setPin('');
              await firestore()
                .collection('users')
                .doc(user.id)
                .update({pin: result.data});
              setUser(prev => ({...prev, register: true, isLogined: true}));
              await AsyncStorage.setItem('register', 'true');
              await AsyncStorage.setItem('isLogined', 'true');
              navigation.replace('Home');
            })
            .catch(err => console.log(err));
        } else {
          alert('Pin ไม่ตรงกัน');
          setConfirm('');
          setValidate(false);
          setIsLoading(false);
        }
      }
    };

    confirm.length === 6 && PinCreate();
  }, [confirm]);

  return (
    <>
      {isLoading && <Loading />}
      {from !== undefined && <BackArrow to="Settings" />}
      <SafeAreaView style={{marginTop: Platform.OS === 'android' ? 40 : 0}}>
        <View>
          {pin.length < 6 ? (
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
                  {user.lang === 'th'
                    ? pin.length < 6
                      ? 'ตั้งค่า Pin ของคุณ'
                      : 'ยืนยัน Pin ของคุณ'
                    : pin.length < 6
                    ? 'Setting Your Pin'
                    : 'Confirm Your Pin'}
                </Text>

                <Text style={{lineHeight: 30}} size={2} color="#414141">
                  {user.lang === 'th'
                    ? 'สามารถเปลี่ยนได้ในตั้งค่า'
                    : 'You can change it in Settings'}
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
                  value={pin.length < 6 ? pin : confirm}
                  onTextChange={value => {
                    if (/^\d+$/.test(value) || value === '')
                      pin.length < 6 ? setPin(value) : setConfirm(value);
                  }}
                />
              </View>
            </View>
          ) : (
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
                  {user.lang === 'th'
                    ? pin.length < 6
                      ? 'ตั้งค่า Pin ของคุณ'
                      : 'ยืนยัน Pin ของคุณ'
                    : pin.length < 6
                    ? 'Setting Your Pin'
                    : 'Confirm Your Pin'}
                </Text>

                <Text style={{lineHeight: 30}} size={2} color="#414141">
                  {user.lang === 'th'
                    ? 'สามารถเปลี่ยนได้ในตั้งค่า'
                    : 'You can change it in Settings'}
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
                  value={pin.length < 6 ? pin : confirm}
                  onTextChange={value => {
                    if (/^\d+$/.test(value) || value === '')
                      pin.length < 6 ? setPin(value) : setConfirm(value);
                  }}
                  onFulfill={() => setValidate(true)}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreatePin;
