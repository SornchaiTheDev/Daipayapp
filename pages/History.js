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
  ScrollView,
  FlatList,
} from 'react-native';
import Text from '../components/Text';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';

//Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import BackArrow from '../components/BackArrow';

import Card from '../components/Card';

import {User} from './User';


const Item = ({event, time, amount, user}) => {
  const [date, setDate] = useState();
  const when = new Date(time.seconds * 1000);
  const check = when.getTime().toString().slice(0, 7);
  const today = new Date().getTime().toString().slice(0, 7);
  const [name, setName] = useState('');

  useEffect(() => {
    // console.log(`${today} - ${check}`);
    if (today - check <= 4)
      return setDate(user.lang === 'th' ? 'วันนี้' : 'Today');
    if (today - check > 4 && today - check <= 148)
      return setDate(user.lang === 'th' ? 'เมื่อวาน' : 'Yesterday');
    setDate(`${when.getDate()} ${month[when.getMonth()]}`);
  }, [time]);

  useEffect(() => {
    if (user.lang === 'en') {
      if (event === 'ซื้ออาหาร') {
        setName('Food');
      }
      if (event === 'โอนเงิน') {
        setName('Transfer');
      }
      if (event === 'ซื้อของมาร์ท') {
        setName('Mart');
      }
    } else {
      setName(event);
    }
  }, [name]);

  const month = [
    'ม.ค',
    'ก.พ',
    'มี.ค',
    'เม.ย',
    'พ.ค',
    'มิ.ย',
    'ก.ค',
    'ส.ค',
    'ก.ย',
    'ต.ค',
    'พ.ย',
    'ธ.ค',
  ];

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        margin: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text size={2} weight="400">
          {date}{' '}
          {`${when
            .getHours()
            .toString()
            .padStart(2, '0')}:${when
            .getMinutes()
            .toString()
            .padStart(2, '0')}`}
        </Text>

        <Text size={3} weight="500">
          {name}
        </Text>
      </View>
      <Text size={2.5} weight="500" color={amount > 0 ? 'green' : 'red'}>
        {amount > 0 && '+'} {amount} ฿
      </Text>
    </View>
  );
};

const DATA = [
  {event: 'เติมเงิน', amount: 100, time: new Date('May 1 , 2021 10:10:00')},
  {event: 'ซื้ออาหาร', amount: -25, time: new Date('April 29 , 2021 10:10:01')},
];
function History({navigation}) {
  const [validate, setValidate] = useState(false);
  const [data, setData] = useState([]);
  const {user} = useContext(User);

  useEffect(() => {
    const fetchData = async () => {
      const getHistory = await firestore()
        .collection('users')
        .doc(user.id)
        .collection('history')
        .orderBy('time', 'desc')
        .limit(10)
        .get();

      const data = [];
      getHistory.forEach(doc => data.push(doc.data()));
      setData([...data]);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(data.length);
  // }, [data]);

  return (
    <>
      <BackArrow />
      <View
        style={{
          marginTop: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // position: 'absolute',
          // top: 140,
        }}>
        <Card name={user.name} money={user.money} />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50%',
          marginTop: 20,
        }}>
        {!user.connected ? (
          <>
            <Icon name="frown" size={RFPercentage(6)} style={{margin: 10}} />
            <Text size={2.6}>ไม่ได้เชื่อมต่ออินเทอร์เน็ต</Text>
          </>
        ) : data.length > 0 ? (
          <FlatList
            data={data.sort((a, b) => b.time.seconds - a.time.seconds)}
            style={{width: '90%', minHeight: '100%'}}
            renderItem={({item}) => (
              <Item
                event={item.name}
                time={item.time}
                amount={item.amount}
                user={user}
              />
            )}
            keyExtractor={item => item.time}
          />
        ) : (
          <>
            <Icon name="frown" size={RFPercentage(6)} style={{margin: 10}} />
            <Text size={2.6}>ยังไม่มีประวัติ</Text>
          </>
        )}
      </View>
    </>
  );
}

export default History;
