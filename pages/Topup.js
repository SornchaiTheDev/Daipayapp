import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
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

import Dissmiss from '../components/Dismiss';

import BackArrow from '../components/BackArrow';

import {User} from './User';


function Topup({navigation}) {
  const [validate, setValidate] = useState(false);
  const [amount, setAmount] = useState('');
  const {user} = useContext(User);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    amount !== null && amount.toString().length > 0 && amount > 0
      ? setValidate(true)
      : setValidate(false);
  }, [amount]);
  return (
    <>
      <BackArrow />
      <Dissmiss>
        <SafeAreaView
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
              marginTop: windowHeight === 667 ? '25%' : '50%',
            }}>
            <Text
              style={{textAlign: 'justify'}}
              size={3}
              weight="600"
              color="#414141">
              {user.lang === 'th' ? 'เติมเงิน' : 'Topup'}
            </Text>
            <Text style={{lineHeight: 30}} size={2} color="#414141">
              {user.lang === 'th'
                ? 'ใส่จำนวนเงินที่ต้องการเติม'
                : 'Enter Amount'}
            </Text>
          </View>
          <View
            style={{
              //   margin: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
                borderColor: '#CDCDCD',
                borderWidth: 1,
                marginTop: 20,
                width: wp(50),
                height: 70,
                borderRadius: 20,
                padding: 10,
              }}>
              <TextInput
                keyboardType="number-pad"
                value={amount
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                onChangeText={value => {
                  if (/^\d+$/.test(value.replace(/,/g, '')) || value === '')
                    setAmount(value.toString().replace(/,/g, ''));
                }}
                style={{
                  color: 'black',
                  width: wp(40),
                  fontFamily: 'Kanit-Regular',
                  fontSize: RFPercentage(Platform.OS === 'ios' ? 3.5 : 3),
                }}
              />
              <Text>฿</Text>
            </View>
          </View>

          <TouchableOpacity
            disabled={amount <= 0}
            activeOpacity={0.6}
            onPress={() => navigation.push('QRCode', {amount: amount})}
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 6,
              shadowOpacity: 0.2,
              marginTop: 30,
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
                {user.lang === 'th' ? 'ยืนยัน' : 'Confirm'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </Dissmiss>
    </>
  );
}

export default Topup;
