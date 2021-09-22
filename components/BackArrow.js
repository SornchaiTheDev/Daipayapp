import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Text from './Text';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {navigationRef} from './NextButton';

import {User} from '../pages/User';

function BackArrow({save, isSave = false, from = '', to = ''}) {
  const {user} = useContext(User);
  const navigate = () => {
    if (from === '' && to === '') {
      navigationRef.current?.goBack();
      return;
    }

    navigationRef.current?.navigate(to);
  };
  return (
    <View
      style={{
        width: wp(100),
        backgroundColor: 'white',
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: '#F3F3F3',
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',

            width: '40%',
          }}
          onPress={navigate}>
          <Icon name="arrowleft" size={RFPercentage(4)} />
          <Text size={2}>{user.lang === 'th' ? 'ย้อนกลับ' : 'Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: isSave ? 'flex' : 'none',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onPress={save}>
          <Text size={2} weight="500">
            {user.lang === 'th' ? 'บันทึก' : 'Save'}
          </Text>
          <Icon name="check" size={RFPercentage(3)} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BackArrow;
