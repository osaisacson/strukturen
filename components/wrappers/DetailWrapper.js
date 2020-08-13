import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

import ScrollViewToTop from './ScrollViewToTop';

export const DetailWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollViewToTop>
        <View style={styles.mainDetailWrap}>{children}</View>
      </ScrollViewToTop>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainDetailWrap: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
  },
});
