import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';

import Colors from '../constants/Colors';
import { SpotlightNavigator } from './SpotlightNavigator';

const TabStackNavigator = createMaterialBottomTabNavigator();

export const TabNavigator = ({ navigation }) => {
  return (
    <TabStackNavigator.Navigator
      initialRouteName="Strukturen"
      labeled
      shifting
      activeColor={Colors.lightPrimary}
      inactiveColor={Colors.lightPrimary}
      barStyle={{ backgroundColor: Colors.primary }}>
      <TabStackNavigator.Screen
        unmountOnBlur
        name="Strukturen"
        component={SpotlightNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={23} />,
        }}
      />
      <TabStackNavigator.Screen
        unmountOnBlur
        name="Annat"
        component={SpotlightNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={23} />,
        }}
      />
    </TabStackNavigator.Navigator>
  );
};
