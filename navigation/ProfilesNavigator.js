import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AllProfilesScreen from '../screens/AllProfilesScreen';
import { defaultNavOptions, defaultMainPageOptions } from './NavHeaders';

const ProfilesStackNavigator = createStackNavigator();

export const ProfilesNavigator = () => {
  return (
    <ProfilesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfilesStackNavigator.Screen
        name="Alla Användare"
        component={AllProfilesScreen}
        options={defaultMainPageOptions}
      />
    </ProfilesStackNavigator.Navigator>
  );
};
