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
import firestore from '@react-native-firebase/firestore';

import Dissmiss from '../components/Dismiss';

import {User} from './User';

import Loading from '../components/Loading';

const Card = ({onChange, value}) => {
  const [name, setName] = useState('');
  const {user, setUser} = useContext(User);
  const {width, height, scale} = Dimensions.get('window');
  useEffect(() => {
    name.length > 0 ? onChange(true) : onChange(false);

    value(name);
  }, [name]);
  return (
    <LinearGradient
      colors={['#00D2FF', '#3A7BD5']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        // width: wp(90),
        // height: Platform.OS === 'ios' ? hp(26) : hp(30),
        width: width / 1.1,
        height: height / (scale * 1.15),
        backgroundColor: '#00D2FF',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
      }}>
      <View
        style={{
          // backgroundColor: 'black',
          position: 'absolute',
          right: -30,
          top: 20,
          width: '100%',
          //   transform: [{rotate: '90deg'}],
        }}>
        <Text color="white" weight="400" size={3}>
          xxx-xxxx-xxxx
        </Text>
        <Text color="white" weight="400" size={2}>
          ชื่อ (อะไรก็ได้) <Text color="red">*</Text>
        </Text>
        <View
          style={{
            minHeight: 40,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="แตะที่นี่เพื่อตั้งชื่อ"
            placeholderTextColor="#E9E9EC"
            style={{
              marginVertical: 6,
              borderWidth: name.length === 0 ? 2 : 0,
              borderStyle: 'dashed',
              borderColor: 'white',
              borderRadius: 10,
              color: 'white',
              fontSize: RFPercentage(3.5),
              fontFamily: 'Kanit-Regular',
              fontWeight: '400',
              width: wp(70),
              marginRight: 10,
              padding: 6,
            }}
            value={name}
            onChangeText={text => setName(text)}
            maxLength={16}
          />
          <Text color="white" weight="400" size={2}>
            {name.length}/16
          </Text>
        </View>
        <Text color="white" weight="400" size={2}>
          เงินในบัตร
        </Text>
        <Text color="white" weight="500" size={4}>
          0 ฿
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: Platform.OS === 'ios' ? -30 : -20,
          //   transform: [{rotate: '90deg'}],
          // backgroundColor  : "black"
        }}>
        <Text size={10} color="white" style={{opacity: 0.2}}>
          ได้เพย์
        </Text>
      </View>

      <TouchableOpacity
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
          padding: 6,
        }}>
        <Text size={2}>ประวัติ</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['#00D2FF', 'rgba(58,123,213,0.5)']}
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
          zIndex: -999,
        }}></LinearGradient>
      <LinearGradient
        colors={['#00D2FF', 'rgba(58,123,213,0.5)']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          opacity: 0.9,
          position: 'absolute',
          top: 50,
          right: -50,
          width: wp(30),
          height: wp(30),
          zIndex: -999,
          // backgroundColor: 'pink',
          borderRadius: 200,
        }}></LinearGradient>
    </LinearGradient>
  );
};

function Create({navigation}) {
  const [validate, setValidate] = useState(false);
  const {user, setUser} = useContext(User);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Created = async () => {
    setIsLoading(true);
    await firestore()
      .collection('users')
      .doc(user.id)
      .update({name: name})
      .then(() => {
        setIsLoading(false);
        setUser(prev => ({...prev, name: name}));
        navigation.navigate('CreatePin');
      });
  };

  return (
    <>
      {isLoading && <Loading />}
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
              marginTop: '50%',
            }}>
            <Text
              style={{textAlign: 'justify'}}
              size={3}
              weight="600"
              color="#414141">
              ตั้งชื่อบัตรของคุณ
            </Text>
            <Text style={{lineHeight: 30}} size={2} color="#414141">
              สามารถเปลี่ยนได้ในตั้งค่า
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
            <Card
              onChange={value => setValidate(value)}
              value={value => setName(value)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => validate && Created()}
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
                ยืนยัน
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </Dissmiss>
    </>
  );
}

export default Create;
