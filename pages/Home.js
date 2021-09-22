import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Linking,
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

import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Dissmiss from '../components/Dismiss';

import Card from '../components/Card';

import {User} from './User';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({navigation}) {
  const [validate, setValidate] = useState(false);
  const [news, setNews] = useState([]);

  const {user, setUser} = useContext(User);

  const Menu = [
    {
      name: user.lang === 'th' ? 'เติมเงิน' : 'Topup',
      icon: 'bank',
      to: 'Topup',
    },
    {
      name: user.lang === 'th' ? 'โอนเงิน' : 'Transfer',
      icon: 'swap',
      to: 'Transfer',
    },
    {name: user.lang === 'th' ? 'แสกนจ่าย' : 'Scan', icon: 'qrcode', to: 'Pay'},
  ];

  // Notification
  useEffect(() => {
    getPermission = async () => {
      const authorize = await messaging().requestPermission();

      if (authorize) {
        const fcmToken = await messaging().getToken();
        user.fcmToken !== '' &&
          firestore()
            .collection('users')
            .doc(user.id)
            .set({fcmToken: fcmToken}, {merge: true});
      }
    };

    getPermission();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const getNews = async () => {
      const news = await firestore().collection('news').doc('api').get();
      setNews(news.data());
    };

    user.connected && getNews();
  }, [user.connected]);

  return (
    <>
      <ScrollView>
        <Dissmiss>
          <LinearGradient
            colors={['#3A7BD5', '#00D2FF']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              backgroundColor: '#3A7BD5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: hp(100),
            }}>
            {/* <View
          style={{
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
            หน้าหลัก
          </Text>
          <Text style={{lineHeight: 30}} size={2} color="#414141">
            สามารถเปลี่ยนได้ในตั้งค่า
          </Text>
        </View> */}
            <View
              style={{
                // margin: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'absolute',
                top: 140,
                zIndex: 999,
              }}>
              <Card name={user.name} money={user.money} home />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FBFBFF',
                position: 'absolute',
                right: 20,
                top: 50,
                width: wp(12),
                height: wp(12),
                borderRadius: 20,
              }}>
              <Icon name="setting" size={RFPercentage(3)} />
            </TouchableOpacity>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                width: wp(100),
                height: hp(72),
                marginTop: '70%',
                zIndex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '40%',
                }}>
                {Menu.map(({name, icon, to}) => (
                  <TouchableOpacity
                    disabled={!user.connected}
                    activeOpacity={0.6}
                    key={name}
                    onPress={() => navigation.navigate(to)}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <LinearGradient
                      colors={
                        user.connected
                          ? ['#00D2FF', '#3A7BD5']
                          : ['#CDCDCD', '#CDCDCD']
                      }
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'black',
                        width: wp(16),
                        height: wp(16),
                        borderRadius: 100,
                      }}>
                      <Icon name={icon} color="white" size={RFPercentage(3)} />
                    </LinearGradient>
                    <Text size={2} color="#414141">
                      {name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{padding: 20, marginTop: 20}}>
                <Text size={2.5} weight="600" style={{marginBottom: 6}}>
                  {user.lang === 'th' ? 'ข่าวประชาสัมพันธ์' : 'News'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => Linking.openURL(news.url)}>
                  <Image
                    source={{
                      uri: news.img,
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                    }}
                    width={wp(90)}
                    height={hp(26)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Dissmiss>
      </ScrollView>
    </>
  );
}

export default Home;
