import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: Styles.defaultFontFamily,
    fontSize: 15,
  },
  headerBackTitleStyle: {
    fontFamily: 'roboto-regular',
  },
  headerTintColor: Colors.primary,
};

export const defaultMainPageOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <View style={styles.avatarContainer}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </View>
    ),
  };
};

export const detailHeader = (navData) => {
  return {
    headerTitle: '',
  };
};

export const detailHeaderForTabs = (navData) => {
  return {
    headerBackTitle: 'Tillbaka',
    headerTitle: '',
  };
};

export const topStackHeaderForTabs = (navData) => {
  return {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTitleStyle: {
      fontFamily: 'bowlby-bold',
      fontSize: 25,
    },
    headerBackTitleStyle: {
      fontFamily: 'roboto-regular',
    },
    headerTintColor: Colors.primaryAccent,
    headerRight: () => (
      <View style={styles.avatarContainer}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </View>
    ),
  };
};

export const mainPageOptionsWithUser = (navData) => {
  return {
    headerTitle: '',
    headerRight: () => (
      <View
        style={Platform.select({
          android: styles.avatarContainer,
        })}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </View>
    ),
  };
};

export const mainPageOptionsNoUser = () => {
  return {
    headerTitle: '',
    headerRight: '',
    // headerRight: () => (
    //   <ButtonIcon
    //     badge={2} //TBD: In-app messaging - should show nr of unanswered messages
    //     style={{ marginRight: 30, marginTop: 5 }}
    //     icon="email"
    //     color={Colors.primary}
    //     borderColor={Colors.primary}
    //     size={24}
    //   />
    // ),
  };
};

export const emptyHeader = (navData) => {
  return {
    headerLeft: '',
    headerTitle: '',
    headerRight: '',
  };
};

const styles = StyleSheet.create({
  avatarContainer: { marginRight: 10 },
  userAvatar: { marginRight: 10 },
});
