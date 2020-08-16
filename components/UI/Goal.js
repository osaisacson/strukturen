import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Styles from '../../constants/Styles';
import Card from './Card';
import TouchableCmp from './TouchableCmp';

const Goal = ({ goal }) => {
  const { title, text, isDone } = goal;

  return (
    <View style={styles.container}>
      <Card style={styles.goal}>
        <View style={styles.touchable}>
          <TouchableCmp useForeground>
            <Text style={{ fontFamily: Styles.defaultFontFamily }}>{title}</Text>
          </TouchableCmp>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  goal: {
    height: Styles.goalHeight,
    width: Styles.goalHeight,
    marginLeft: Styles.homeMargin,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  touchable: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Goal;
