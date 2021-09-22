import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const Dismiss = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default Dismiss;
