import React, {createRef, useContext, useEffect, useState} from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Text from '../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NextButton from '../components/NextButton';

import {User} from './User';

function WhereToTopup() {
  const {user, setUser} = useContext(User);
  const windowHeight = Dimensions.get('window').height;
  const windowScale = Dimensions.get('window').scale;

  return (
    <SafeAreaView
      style={{
        // backgroundColor : "#b1bb2c",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 40 : 50,
      }}>
      <View
        style={{
          margin: 50,
          height: (windowHeight / windowScale) * 1.15,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: wp(90),
            height: hp(50),
          }}
          source={require('../assets/img/wheretotopup.jpg')}
        />
      </View>
      <View
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
          {user.lang === 'th'
            ? 'แล้วเติมเงินที่ไหนอะไรยังไง'
            : 'Where to Topup ?'}
        </Text>
        <Text style={{lineHeight: 30}} size={2} color="#414141">
          {user.lang === 'th'
            ? ' ทุกคนสามารถเติมเงินได้ที่จุดเติมเงินต่างๆภายในโรงเรียน ไม่ว่าจะเป็นอาคาร 3 หรือธนาคารโรงเรียน'
            : 'You can topup at Building 3 or School Bank'}
        </Text>
      </View>
      <NextButton to="HowToUse" />
    </SafeAreaView>
  );
}

export default WhereToTopup;
