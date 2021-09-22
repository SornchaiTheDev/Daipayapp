import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Dissmiss from '../components/Dismiss';
import Loading from '../components/Loading';

//Firebase
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import BackArrow from '../components/BackArrow';

import Card from '../components/Card';

import {User} from './User';


function Transfer({navigation}) {
  const {user} = useContext(User);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const TransferCreation = async () => {
    setIsLoading(true);

    const accountCheck = await firestore()
      .collection('users')
      .where('acc_id', '==', account.match(/\d{3}(?=\d{2,3})|\d+/g).join('-'))
      .get();

    let isExist;
    let id;
    let toUser;
    let fcmToken;
    await accountCheck.forEach(doc => {
      isExist = doc.exists;
      id = doc.id;
      toUser = doc.data().name;
      fcmToken = doc.data().fcmToken;
    });

    if (isExist && id !== user.id && user.money >= amount) {
      setIsLoading(false);
      navigation.push('Pin', {
        from: 'Transfer',
        toAcc: id,
        toUser: toUser,
        to: 'TransactionSuccess',
        amount: amount,
        fcmToken: fcmToken,
      });
    }

    if (id === user.id) {
      setIsLoading(false);

      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโอนให้ตัวเองได้', [
        {text: 'ตกลง'},
      ]);
      return;
    }
    if (!isExist) {
      setIsLoading(false);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบบัญชีนี้', [{text: 'ตกลง'}]);
      return;
    }
    if (amount > user.money) {
      setIsLoading(false);
      Alert.alert('เกิดข้อผิดพลาด', 'จำนวนเงินไม่พอ', [{text: 'ตกลง'}]);
      return;
    }
  };

  useEffect(() => {
    account !== '' && amount !== '' && amount > 0
      ? setValidate(true)
      : setValidate(false);
  }, [account, amount]);
  return (
    <>
      {isLoading && <Loading />}
      <BackArrow />
      <Dissmiss>
        <ScrollView style={{height: '100%'}}>
          <KeyboardAvoidingView
            behavior="position"
            style={{
              flex: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: wp(100),
                marginTop: 50,
                backgroundColor: 'white',
                height: hp(100),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Card name={user.name} money={user.money} />
              <View
                style={{
                  marginTop: 40,
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <Text size={2}>{user.lang === 'th' ? 'โอนไปยัง' : 'To'}</Text>
                <TextInput
                  keyboardType="number-pad"
                  value={
                    account !== ''
                      ? account.match(/\d{3}(?=\d{2,3})|\d+/g).join('-')
                      : account
                  }
                  onChangeText={value => {
                    if (/^\d+$/.test(value.replace(/-/g, '')) || value === '')
                      setAccount(value.replace(/-/g, ''));
                  }}
                  style={{
                    color: 'black',
                    marginTop: 20,
                    padding: 10,
                    width: '100%',
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: '#F3F3F3',
                    fontFamily: 'Kanit-Regular',
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    fontSize: RFPercentage(3),
                  }}
                />
                <View
                  style={{
                    marginTop: 20,
                  }}>
                  <Text size={2}>
                    {' '}
                    {user.lang === 'th' ? 'จำนวน' : 'Amount'}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: '#F3F3F3',
                      borderColor: '#CDCDCD',
                      borderWidth: 1,
                      marginTop: 20,
                      width: wp(50),
                      height: 60,
                      borderRadius: 10,
                      padding: 6,
                    }}>
                    <TextInput
                      keyboardType="number-pad"
                      value={amount
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      onChangeText={value => {
                        if (
                          /^\d+$/.test(value.replace(/,/g, '')) ||
                          value === ''
                        )
                          setAmount(value.toString().replace(/,/g, ''));
                      }}
                      style={{
                        color: 'black',
                        width: wp(40),
                        fontFamily: 'Kanit-Regular',
                        fontSize: RFPercentage(2.5),
                      }}
                    />
                    <Text size={3}>฿</Text>
                  </View>

                  <TouchableOpacity
                    disabled={!validate}
                    activeOpacity={0.6}
                    onPress={TransferCreation}
                    style={{
                      marginTop: 20,
                      alignSelf: 'center',
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 0},
                      shadowRadius: 6,
                      shadowOpacity: 0.2,
                    }}>
                    <LinearGradient
                      colors={
                        !validate
                          ? ['#CDCDCD', '#CDCDCD']
                          : ['#00D2FF', '#3A7BD5']
                      }
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
                        {user.lang === 'th' ? 'โอน' : 'Transfer'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Dissmiss>
    </>
  );
}

export default Transfer;
