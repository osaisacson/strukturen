import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';

import Colors from './../../constants/Colors';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={30} color={Colors.primaryAccent} />
  );
};

export default CustomHeaderButton;
