import React, {createRef, useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NextButton from '../components/NextButton';
import Icon from 'react-native-vector-icons/AntDesign';

export const navigationRef = createRef();

import {User} from './User';

import RNPickerSelect from 'react-native-picker-select';

const Card = ({onChange, value, user}) => {
  const {width, height, scale} = Dimensions.get('window');

  const name = [
    'Steve Jobs',
    'Elon Musk',
    '😍',
    '😝',
    'Larry Page',
    'Sornchai Somsakul',
    'IG : _cho_kun_',
    'อยากกินข้าวไข่เจียว',
  ];
  const [choose, setChoose] = useState(0);
  const [timeout, setTimeOut] = useState(60);
  useEffect(() => {
    const countdown = setTimeout(() => {
      setTimeOut(prev => prev - 1);
      setChoose(prev => (prev += 1));

      choose === 6 && setChoose(0);
      timeout === 0 && setTimeOut(60);
    }, 1500);

    return () => clearTimeout(countdown);
  }, [timeout]);
  return (
    <LinearGradient
      colors={['#00D2FF', '#3A7BD5']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        width: width / 1.1,
        height: height / (scale * 1.75),
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
          {user.lang === 'th' ? 'ชื่อ' : 'Name'}
        </Text>
        <View
          style={{
            minHeight: 40,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            zIndex: 999,
          }}>
          <Text color="white" weight="400" size={4}>
            {name[choose]}
          </Text>
        </View>
        <Text color="white" weight="400" size={2}>
          {user.lang === 'th' ? 'เงินในบัตร' : 'Balance'}
        </Text>
        <Text color="white" weight="500" size={4}>
          0 ฿
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
        <Text size={2}> {user.lang === 'th' ? 'ประวัติ' : 'History'}</Text>
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
          zIndex: -10,
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
          borderRadius: 200,
          zIndex: -10,
        }}></LinearGradient>
    </LinearGradient>
  );
};

function Welcome({navigation}) {
  const {user, setUser} = useContext(User);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // useEffect(() => {
  //   navigation.navigate('Pay');
  //   if (user.register) {
  //   }
  // }, [user]);

  return (
    <>
      <View
        style={
          Platform.OS === 'ios'
            ? {
                position: 'absolute',
                top: 50,
                right: 20,
                padding: 10,
                zIndex: 999,
                width: '20%',
              }
            : {
                position: 'absolute',
                top: 50,
                right: 20,
                padding: 0,
                zIndex: 999,
                width: '30%',
                borderWidth: 1,
                borderRadius : 10,
              }
        }>
        <RNPickerSelect
          placeholder={{}}
          Icon={() => <Icon name="earth" size={16} />}
          style={{
            inputIOS: {
              fontSize: 18,
              borderWidth: 1,
              padding: 6,
              borderRadius: 6,
            },

            iconContainer: {
              top: Platform.OS === 'ios' ? 10 : 20,
              right: 0,
              marginHorizontal: 6,
            },
          }}
          value={user.lang}
          onValueChange={select => setUser(prev => ({...prev, lang: select}))}
          items={[
            {label: 'TH', value: 'th'},
            {label: 'EN', value: 'en'},
          ]}
        />
        {/* <Picker
          style={{width: wp(26)}}
          selectedValue={user.lang}
          onValueChange={select => setUser(prev => ({...prev, lang: select}))}>
          <Picker.Item label="TH" value="th" />
          <Picker.Item label="EN" value="en" />
        </Picker> */}
      </View>
      <SafeAreaView
        style={{
          // backgroundColor : "#b1bb2c",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginTop: Platform.OS === 'android' ? 40 : 70,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              shadowOpacity: 0.15,
              elevation: 3,
            }}>
            <Card user={user} />
          </View>
          <View
            style={{
              padding: 10,
              width: wp(90),
              elevation: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{textAlign: 'justify'}}
              size={Platform.OS === 'ios' ? 3 : 2.5}
              weight="500"
              color="#414141">
              {user.lang === 'th'
                ? 'มาลองใช้บัตรได้เพย์กันได้เล้ย!'
                : " Let's Get Start !"}
            </Text>
            <Text
              style={{lineHeight: 30, textAlign: 'justify'}}
              weight={user.lang === 'th' ? '400' : '500'}
              size={2}
              color="#414141">
              {user.lang === 'th'
                ? 'แก้ปัญหาหลงๆลืมเงินไว้ที่บ้าน เรียนหนักไปกระเป๋าตังหายไปไหนไม่รู้ และปัญหาอีกมากมายที่เจอในแต่ละวัน'
                : 'Daipay provide a service use to pay in Phuketwittayalai school and  make your life easier!  '}
            </Text>
          </View>
          <NextButton to="WhereToTopup" />
        </View>
      </SafeAreaView>
    </>
  );
}

export default Welcome;
