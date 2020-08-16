import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as authActions from '../store/actions/auth';
import * as goalsActions from '../store/actions/goals';
import * as profilesActions from '../store/actions/profiles';
import { AboutNavigator } from './AboutNavigator';
import { TabNavigator } from './TabNavigator';

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const currentProfile = useSelector((state) => state.profiles.userProfile || {});

  console.log('Calling ShopNavigator');
  console.log(`Profile of current user ${currentProfile ? 'exists' : 'does not exist yet'}`);

  const loadAppData = async () => {
    try {
      console.log('Fetching app data.........');
      const allPromises = await Promise.all([
        dispatch(profilesActions.fetchProfiles()),
        dispatch(goalsActions.fetchGoals()),
      ]);
      return allPromises;
    } catch (error) {
      console.log('Error in attempting to fetch app data, ShopNavigator.js', error);
    } finally {
      setIsLoaded(true);
      console.log('.........all app data loaded in ShopNavigator.js!');
    }
  };

  useEffect(() => {
    loadAppData();
  }, [isLoaded]);

  const dispatch = useDispatch();

  if (!isLoaded) {
    return null;
  }

  return (
    <ShopDrawerNavigator.Navigator
      lazy
      openByDefault={false}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={{ marginTop: 30 }}>
                <Divider style={{ backgroundColor: 'grey' }} />
                <DrawerItemList {...props} />
                <Divider style={{ marginTop: 10, backgroundColor: 'grey' }} />
                <Button
                  color={Colors.primary}
                  mode="contained"
                  style={{
                    marginTop: 200,
                    width: '60%',
                    alignSelf: 'center',
                  }}
                  labelStyle={{
                    paddingTop: 2,
                    color: Colors.primaryAccent,
                    fontFamily: Styles.defaultFontFamily,
                    fontSize: 11,
                  }}
                  compact
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}>
                  Logga ut
                </Button>
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      initialRouteName="Strukturen"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}>
      <ShopDrawerNavigator.Screen
        name="Strukturen"
        component={TabNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons name="home" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Om oss"
        component={AboutNavigator}
        options={{
          drawerIcon: (props) => (
            <FontAwesome name="question-circle" size={26} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
