import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../../constants/Colors';
import ButtonIcon from './ButtonIcon';

const AddGoal = ({ title, subTitle, extraSubTitle, itemToAdd }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textSection}>
        <View style={styles.textAndBadge}>
          <Text style={styles.contentHeader}>{title}</Text>
        </View>
        {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
        {extraSubTitle ? <Text style={styles.extraSubTitle}>{extraSubTitle}</Text> : null}
      </View>
      <View style={styles.indicatorSection}>
        <View style={{ alignSelf: 'flex-end', paddingBottom: subTitle ? 20 : 2 }}>
          <ButtonIcon icon="plus" onSelect={itemToAdd} color={Colors.darkPrimary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textSection: {
    paddingLeft: 15,
    paddingRight: 10,
    flexGrow: 3,
  },
  indicatorSection: {
    flexGrow: 1,
    marginRight: 5,
  },
  textAndBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeader: {
    fontFamily: 'bebas-neue-bold',
    fontSize: 24,
    marginRight: 6,
  },
  simpleCount: {
    fontFamily: 'roboto-light',
    fontSize: 15,
    marginBottom: 6,
  },
  simpleCountForSearch: {
    fontFamily: 'roboto-light-italic',
    fontSize: 16,
  },
  indicator: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    paddingBottom: 2,
  },
  subTitle: {
    fontFamily: 'roboto-light-italic',
    fontSize: 16,
  },
  extraSubTitle: {
    fontFamily: 'roboto-bold-italic',
    fontSize: 16,
  },
});

export default AddGoal;
