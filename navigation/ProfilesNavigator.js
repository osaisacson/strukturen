import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AllProfilesScreen from '../screens/shop/AllProfilesScreen';
import UserProfile from '../screens/user/UserProfile';
import { defaultNavOptions, defaultMainPageOptions, mainPageOptionsWithUser } from './NavHeaders';

const ProfilesStackNavigator = createStackNavigator();

export const ProfilesNavigator = () => {
  return (
    <ProfilesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfilesStackNavigator.Screen
        name="Alla Användare"
        component={AllProfilesScreen}
        options={defaultMainPageOptions}
      />
      <ProfilesStackNavigator.Screen
        name="Användare"
        component={UserProfile}
        options={mainPageOptionsWithUser}
      />
    </ProfilesStackNavigator.Navigator>
  );
};
