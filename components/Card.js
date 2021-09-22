import React, {useContext, useEffect, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import {navigationRef} from '../components/NextButton';
import {User} from '../pages/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Card({name, money, home}) {
  const {user, setUser} = useContext(User);
  const [isConnected, setIsConnected] = useState(true);
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    const fetchData = async () => {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .onSnapshot(doc => {
          const {
            name = 'กำลังโหลด',
            money = 'กำลังโหลด',
            acc_id = 'กำลังโหลด',
            fcmToken = 'กำลังโหลด',
          } = doc.data();
          setUser(prev => ({
            ...prev,
            name: name,
            money: money,
            acc_id: acc_id,
            fcmToken: fcmToken,
          }));
        });
    };

    auth().currentUser.uid !== null && fetchData();
  }, [user]);

  

  return (
    <LinearGradient
      colors={user.connected ? ['#00D2FF', '#3A7BD5'] : ['#CDCDCD', '#CDCDCD']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        width: wp(90),
        height: windowHeight === 667 ? hp(32) : hp(26),
        backgroundColor: '#00D2FF',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 999,
      }}>
      <View
        style={{
          position: 'absolute',
          right: -30,
          top: 20,
          width: '100%',
          zIndex: 999,
        }}>
        <Text color="white" weight="400" size={3}>
          {user.acc_id !== null
            ? user.acc_id
            : user.lang === 'th'
            ? 'กำลังโหลด'
            : 'Loading'}
        </Text>
        <Text color="white" weight="400" size={2}>
          {user.lang === 'th' ? 'ชื่อ' : 'Name'}
        </Text>

        <Text color="white" weight="400" size={4}>
          {user.name !== ''
            ? user.name
            : user.lang === 'th'
            ? 'กำลังโหลด'
            : 'Loading'}
        </Text>

        <Text color="white" weight="400" size={2}>
          {user.lang === 'th' ? 'เงินในบัตร' : 'Balance'}
        </Text>
        <Text color="white" weight="500" size={4}>
          {user.money !== undefined
            ? user.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            : user.lang === 'th'
            ? 'กำลังโหลด'
            : 'Loading'}{' '}
          ฿
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: -30,
          //   transform: [{rotate: '90deg'}],
          // backgroundColor  : "black"
        }}>
        <Text size={10} color="white" style={{opacity: 0.2}}>
          {user.lang === 'th' ? 'ได้เพย์' : 'Daipay'}
        </Text>
      </View>

      {home && (
        <TouchableOpacity
          onPress={() => navigationRef.current?.navigate('History')}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
            width: wp(30),
            height: 30,
            position: 'absolute',
            bottom: 30,
            right: 30,
            zIndex: 999,
            borderRadius: 20,
            padding: Platform.OS === 'ios' ? 6 : 0,
          }}>
          <Text size={2}> {user.lang === 'th' ? 'ประวัติ' : 'History'} </Text>
        </TouchableOpacity>
      )}

      <LinearGradient
        colors={
          user.connected
            ? ['#00D2FF', 'rgba(58,123,213,0.5)']
            : ['#CDCDCD', '#CDCDCD']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          opacity: 0.9,
          position: 'absolute',
          top: -30,
          right: -20,
          width: wp(40),
          height: wp(40),
          // backgroundColor: 'white',
          borderRadius: 200,
        }}></LinearGradient>
      <LinearGradient
        colors={
          user.connected
            ? ['#00D2FF', 'rgba(58,123,213,0.5)']
            : ['#CDCDCD', '#CDCDCD']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          opacity: 0.9,
          position: 'absolute',
          top: 50,
          right: -50,
          width: wp(30),
          height: wp(30),
          // backgroundColor: 'pink',
          borderRadius: 200,
        }}></LinearGradient>
    </LinearGradient>
  );
}

export default Card;
