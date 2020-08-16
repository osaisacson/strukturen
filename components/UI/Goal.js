import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Styles from '../../constants/Styles';
import Card from './Card';
import TouchableCmp from './TouchableCmp';

const Goal = ({ goal, isYear, isMonth, isDay }) => {
  const { title, text, isDone, day } = goal;

  let fontSize;

  if (isYear) {
    fontSize = 33;
  }

  if (isMonth) {
    fontSize = 40;
  }

  if (isDay) {
    fontSize = 50;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.goal}>
        <View style={styles.touchable}>
          <TouchableCmp useForeground>
            {isDay ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  marginBottom: -10,
                  fontFamily: Styles.defaultFontFamily,
                }}>
                {day}
              </Text>
            ) : null}
            <Text
              style={{
                fontSize,
                fontFamily: Styles.defaultFontFamily,
              }}>
              {title}
            </Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Goal;
