import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Switch,
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
import Dissmiss from '../components/Dismiss';

import RNPickerSelect from 'react-native-picker-select';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from './User';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

function Settings({navigation, route}) {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('th');
  const {user, setUser} = useContext(User);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSave, setIsSave] = useState(false);
  useEffect(() => {
    setName(user.name);
    setLanguage(user.lang);
    if (user.biometric === 'on') {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
    // console.log(user.biometric)
  }, []);

  // useEffect(() => {
  //   const biometric = isEnabled ? 'on' : 'off';

  //   if (
  //     user.name !== name ||
  //     user.lang !== language ||
  //     user.biometric !== biometric
  //   ) {
  //     setIsSave(true);

  //     if (name !== '')
  //       firestore().collection('users').doc(user.id).update({name: name});
  //   } else {
  //     setIsSave(false);
  //   }
  // }, [name, language, isEnabled]);

  // const save = async () => {
  //   const biometric = isEnabled ? 'on' : 'off';
  //   await AsyncStorage.setItem('name', name);
  //   await AsyncStorage.setItem('lang', language);
  //   await AsyncStorage.setItem('biometric', biometric);

  //   setUser(prev => ({
  //     ...prev,
  //     name: name,
  //     lang: language,
  //     biometric: biometric,
  //   }));
  //   setIsSave(false);
  // };

  useEffect(() => {
    const save = async () => {
      const biometric = isEnabled ? 'on' : 'off';
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('lang', language);
      await AsyncStorage.setItem('biometric', biometric);

      if (name !== '')
        await firestore().collection('users').doc(user.id).update({name: name});

      setUser(prev => ({
        ...prev,
        name: name,
        lang: language,
        biometric: biometric,
      }));
    };

    save();
  }, [name, language, isEnabled]);
  return (
    <>
      <BackArrow isSave={isSave} save={() => save()} />
      <Dissmiss>
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
                marginTop: 20,
                padding: 10,
                width: wp(100),
                // height: hp(90),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Text size={3} weight="600" style={{marginVertical: 20}}>
                {user.lang === 'th' ? 'ตั้งค่า' : 'Settings'}
              </Text>
              <View>
                <Text size={2.5} weight="500">
                  {user.lang === 'th' ? 'ชื่อในบัตร' : 'Name'}
                </Text>
                <View
                  style={{
                    minHeight: 40,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 10,
                    backgroundColor: '#F3F3F3',
                    borderColor: '#CDCDCD',
                    borderWidth: 1,
                    width: wp(90),
                    height: 60,
                    borderRadius: 20,
                    padding: 2,
                    paddingLeft: 6,
                  }}>
                  <TextInput
                    value={name}
                    onChangeText={value => setName(value)}
                    maxLength={16}
                    style={{
                      color: 'black',
                      fontFamily: 'Kanit-Regular',
                      fontSize: RFPercentage(Platform.OS === 'ios' ? 3.5 : 3),
                      width: '90%',
                    }}
                  />
                  <Text color="black" weight="400" size={2}>
                    {name.length}/16
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '90%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    paddingVertical: 20,
                    borderColor: '#26262C',
                  }}>
                  <Text size={2.5} weight="500">
                    {user.lang === 'th'
                      ? 'เปิดใช้แสกนนิ้วมือ / ใบหน้า'
                      : 'Fingerprint / FaceID'}
                  </Text>
                  {/* <Text size={2.4}>เปิด</Text> */}
                  <Switch
                    value={isEnabled}
                    onValueChange={() => setIsEnabled(prev => !prev)}
                    trackColor={{false: '#F3F3F3', true: '#00D2FF'}}
                    thumbColor={isEnabled ? '#fff' : '#fff'}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.push('Pin', {from: 'Settings', to: 'CreatePin'})
                  }
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    paddingVertical: 20,
                    borderColor: '#26262C',
                  }}>
                  <Text size={2.5} weight="500">
                    {user.lang === 'th' ? 'เปลี่ยน Pin' : 'Change Pin'}
                  </Text>

                  <Icon name="right" size={RFPercentage(2.6)} />
                </TouchableOpacity>

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                    borderColor: '#26262C',
                  }}>
                  <Text size={2.5} weight="500">
                    {user.lang === 'th' ? 'ภาษา' : 'Language'}
                  </Text>
                  <View style={{width: Platform.OS === 'ios' ? '16%' : '30%'}}>
                    <RNPickerSelect
                      style={{
                        inputIOS: {fontSize: 18},
                        iconContainer: {
                          top: Platform.OS === 'ios' ? 3 : 20,
                          right: 0,
                          marginHorizontal: 6,
                        },
                      }}
                      Icon={() => <Icon name="down" size={16} />}
                      value={user.lang}
                      onValueChange={select =>
                        setUser(prev => ({...prev, lang: select}))
                      }
                      items={[
                        {label: 'TH', value: 'th'},
                        {label: 'EN', value: 'en'},
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              // disabled={!validate}
              activeOpacity={0.6}
              onPress={async () => {
                setUser(prev => ({...prev, isLogined: false}));
              }}
              style={{
                marginTop: 50,
                alignSelf: 'center',
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 6,
                shadowOpacity: 0.2,
              }}>
              <LinearGradient
                colors={['#FF416C', '#FF4B2B']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  marginVertical: 50,
                  width: wp(90),
                  backgroundColor: '#00D2FF',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text color="white" size={2.5}>
                  {user.lang === 'th' ? 'ออกจากระบบ' : 'Logout'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Dissmiss>
    </>
  );
}

export default Settings;
