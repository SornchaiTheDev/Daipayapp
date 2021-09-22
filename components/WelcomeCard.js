import React, {createRef} from 'react';
import {View, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const navigationRef = createRef();

const WelcomeCard = () => {
  if (Platform.OS === 'ios') {
    return (
      <LinearGradient
        colors={['#00D2FF', '#3A7BD5']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          // padding : 10,
          width: wp(90),
          backgroundColor: '#00D2FF',
          height: hp(60),
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          transform: [{rotate: '0deg'}],
        }}>
        <View
          style={{
            // backgroundColor: 'black',
            position: 'absolute',
            right: -30,
            top: 60,
            width: '100%',
            transform: [{rotate: '90deg'}],
          }}>
          <Text color="white" weight="400" size={6}>
            101-0120-0010
          </Text>
          <Text color="white" weight="400" size={3.6}>
            ชื่อ
          </Text>
          <Text color="white" weight="400" size={6}>
            ศรชัย สมสกุล
          </Text>
          <Text color="white" weight="400" size={3.6}>
            เงินในบัตร
          </Text>
          <Text color="white" weight="500" size={6}>
            100 ฿
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            left: -100,
            top: 60,
            transform: [{rotate: '90deg'}],
            // backgroundColor  : "black"
          }}>
          <Text size={14} color="white" style={{opacity: 0.2}}>
            ได้เพย์
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: -20,
            transform: [{rotate: '90deg'}],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
            width: wp(40),
            borderRadius: 10,
            height: 40,
          }}>
          <Text size={2.5}>ประวัติการใช้บัตร</Text>
        </View>
        <LinearGradient
          colors={['#00D2FF', 'rgba(58,123,213,0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            opacity: 0.9,
            position: 'absolute',
            bottom: -40,
            right: -20,
            width: wp(55),
            height: wp(55),
            // backgroundColor: 'white',
            borderRadius: 200,
          }}></LinearGradient>
        <LinearGradient
          colors={['#00D2FF', 'rgba(58,123,213,0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            opacity: 0.9,
            position: 'absolute',
            bottom: -90,
            right: 70,
            width: wp(50),
            height: wp(50),
            // backgroundColor: 'pink',
            borderRadius: 200,
          }}></LinearGradient>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={['#00D2FF', '#3A7BD5']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          // padding : 10,
          width: wp(86),
          backgroundColor: '#00D2FF',
          height: hp(60),
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          transform: [{rotate: '0deg'}],
        }}>
        <View
          style={{
            // backgroundColor: 'black',
            position: 'absolute',
            right: -10,
            top: 100,
            width: '100%',
            transform: [{rotate: '90deg'}],
          }}>
          <Text color="white" weight="400" size={4}>
            101-0120-0010
          </Text>
          <Text color="white" weight="400" size={2}>
            ชื่อ
          </Text>
          <Text color="white" weight="400" size={3.5}>
            ศรชัย สมสกุล
          </Text>
          <Text color="white" weight="400" size={2}>
            เงินในบัตร
          </Text>
          <Text color="white" weight="500" size={5}>
            100 ฿
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            left: -90,
            top: 60,
            transform: [{rotate: '90deg'}],
            // backgroundColor  : "black"
          }}>
          <Text size={10} color="white" style={{opacity: 0.2}}>
            ได้เพย์
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 120,
            left: -40,
            transform: [{rotate: '90deg'}],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F9F9F9',
            width: wp(40),
            borderRadius: 10,
            height: 40,
          }}>
          <Text size={1.5}>ประวัติการใช้บัตร</Text>
        </View>
        <LinearGradient
          colors={['#00D2FF', 'rgba(58,123,213,0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            opacity: 0.9,
            position: 'absolute',
            bottom: -40,
            right: -20,
            width: wp(50),
            height: wp(50),
            backgroundColor: 'white',
            borderRadius: 200,
          }}></LinearGradient>
        <LinearGradient
          colors={['#00D2FF', 'rgba(58,123,213,0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            opacity: 0.9,
            position: 'absolute',
            bottom: -90,
            right: 70,
            width: wp(45),
            height: wp(45),
            backgroundColor: 'pink',
            borderRadius: 200,
          }}></LinearGradient>
      </LinearGradient>
    );
  }
};
export default WelcomeCard;
