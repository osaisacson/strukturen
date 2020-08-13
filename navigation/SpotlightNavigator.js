import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import usePopToTopOnBlur from '../hooks/usePopToTopOnBlur';
import EditGoalScreen, {
  screenOptions as editGoalScreenOptions,
} from '../screens/addAndEdit/EditGoalScreen';
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from '../screens/addAndEdit/EditProfileScreen';
import GoalDetailScreen from '../screens/details/GoalDetailScreen';
import Goals from '../screens/shop/Goals';
import HomeScreen from '../screens/shop/HomeScreen';
import UserGoalsScreen from '../screens/user/UserGoalsScreen';
import UserProfile from '../screens/user/UserProfile';
import {
  detailHeader,
  defaultNavOptions,
  defaultMainPageOptions,
  mainPageOptionsNoUser,
  mainPageOptionsWithUser,
} from './NavHeaders';

const SpotlightStackNavigator = createStackNavigator();

export const SpotlightNavigator = ({ navigation }) => {
  usePopToTopOnBlur(navigation, 'Strukturen');

  return (
    <SpotlightStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SpotlightStackNavigator.Screen
        name="Strukturen"
        component={HomeScreen}
        options={defaultMainPageOptions}
      />
      <SpotlightStackNavigator.Screen name="Återbruk" component={Goals} />
      {/* Details */}
      <SpotlightStackNavigator.Screen
        name="GoalDetail"
        component={GoalDetailScreen}
        options={detailHeader}
      />
      {/* Edits */}
      <SpotlightStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
      <SpotlightStackNavigator.Screen
        name="EditGoal"
        component={EditGoalScreen}
        options={editGoalScreenOptions}
      />
      <SpotlightStackNavigator.Screen
        name="Användare"
        component={UserProfile}
        options={mainPageOptionsWithUser}
      />
      <SpotlightStackNavigator.Screen
        name="Mitt upplagda återbruk"
        component={UserGoalsScreen}
        options={mainPageOptionsNoUser}
      />
    </SpotlightStackNavigator.Navigator>
  );
};
