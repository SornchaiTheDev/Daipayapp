import React, {useEffect, useContext, useState} from 'react';
import 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

//Pages
import Welcome from './pages/Welcome';
import WhereToTopup from './pages/WhereToTopup';
import HowToUse from './pages/Howtouse';
import Register from './pages/Register';
import Create from './pages/Create';
import Home from './pages/Home';
import Topup from './pages/Topup';
import QRCode from './pages/QRCode';
import Settings from './pages/Settings';
import History from './pages/History';
import Transfer from './pages/Transfer';
import Pay from './pages/Pay';
import Pin from './pages/Pin';
import CreatePin from './pages/CreatePin';
import TransactionSuccess from './pages/TransactionSuccess';
import ConfirmPay from './pages/ConfirmPay';

//NextButton
import {navigationRef} from './components/NextButton';

//AFK
import UserInactivity from 'react-native-user-inactivity';

//firebase
import messaging from '@react-native-firebase/messaging';
import NetInfo from './components/NetInfo';

//Theme
const Theme = {
  ...DefaultTheme,
  colors: {
    background: '#FBFBFF',
  },
};

import UserContext, {User} from './pages/User';

const Stack = createStackNavigator();
function Navigation() {
  const {user, setUser} = useContext(User);
  const [confirm, setConfirm] = useState(false);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage) {
      navigationRef.current?.navigate('History');
    }
  });

  return (
    <>
      {!user.connected && <NetInfo />}
      {user.connected && !user.first && user.isLogined && <NetInfo connected />}
      <UserInactivity
        timeForInactivity={2 * 60 * 1000}
        onAction={active => {
          if (!active) {
            user.isLogined &&
              user.biometric === 'off' &&
              Alert.alert('แจ้งเตือน', 'ไม่ทำรายการนานเกิน', [
                {
                  text: 'ตกลง',
                  onPress: () => (
                    setUser(prev => ({
                      ...prev,
                      isLogined: false,
                    })),
                    navigationRef.current?.navigate('HomePin')
                  ),
                },
              ]);
          }
        }}>
        <NavigationContainer theme={Theme} ref={navigationRef}>
          <Stack.Navigator initialRouteName="Pay">
            {!user.register ? (
              <>
            
                <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="WhereToTopup"
                  component={WhereToTopup}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="HowToUse"
                  component={HowToUse}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Create"
                  component={Create}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="CreatePin"
                  component={CreatePin}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
              </>
            ) : !user.isLogined && user.register ? (
              <>
                <Stack.Screen
                  name="HomePin"
                  component={Pin}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="CreatePin"
                  component={CreatePin}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Create"
                  component={Create}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Pin"
                  component={Pin}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="CreatePin"
                  component={CreatePin}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />

                <Stack.Screen
                  name="Topup"
                  component={Topup}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="QRCode"
                  component={QRCode}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="History"
                  component={History}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Transfer"
                  component={Transfer}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="TransactionSuccess"
                  component={TransactionSuccess}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                />
                <Stack.Screen
                  name="Pay"
                  component={Pay}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.ModalPresentationIOS,
                  }}
                />
                <Stack.Screen
                  name="ConfirmPay"
                  component={ConfirmPay}
                  options={{
                    headerShown: false,
                    ...TransitionPresets.ModalPresentationIOS,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserInactivity>
    </>
  );
}

export default Navigation;
