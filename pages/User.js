import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

//BootSplash
import RNBootSplash from 'react-native-bootsplash';
import {useNetInfo} from '@react-native-community/netinfo';

export const User = createContext();

const UserContext = ({children}) => {
  const netInfo = useNetInfo();
  const [user, setUser] = useState({
    acc_id: null,
    biometric: false,
    id: '',
    name: '',
    money: 0,
    lang: 'th',
    register: false,
    isLogined: false,
    connected: true,
    token: false,
    confirm: true,
    first: true,
  });
  useEffect(() => {
    const getData = async () => {
      // const name = await AsyncStorage.getItem('name');
      const lang = (await AsyncStorage.getItem('lang')) || 'th';
      const biometric = await AsyncStorage.getItem('biometric');
      const register = await AsyncStorage.getItem('register');
      const id = await AsyncStorage.getItem('id');

      setUser(prev => ({
        ...prev,
        id: id,
        lang: lang,
        biometric: biometric,
        register: register,
      }));
    };

    getData();
  }, []);

  useEffect(() => {
    user.id !== '' && RNBootSplash.hide({fade: true});
  }, [user]);

  useEffect(() => {
    setUser(prev => ({...prev, connected: netInfo.isConnected, first: false}));
  }, [netInfo]);

  return <User.Provider value={{user, setUser}}>{children}</User.Provider>;
};

export default UserContext;
