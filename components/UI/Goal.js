import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import Card from './Card';
import TouchableCmp from './TouchableCmp';

const Goal = ({ goal, isYear, isMonth, isDay }) => {
  const { year, month, day, weekDay, isDone } = goal;

  let itemColor;
  let fontSize;
  let title;

  if (isYear) {
    title = year;
    itemColor = Colors.year;
    fontSize = 33;
  }

  if (isMonth) {
    title = month;
    itemColor = Colors.month;
    fontSize = 35;
  }

  if (isDay) {
    title = day;
    itemColor = Colors.day;
    fontSize = 50;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.goal}>
        <View style={styles.touchable}>
          <TouchableCmp useForeground>
            {isDay ? <Text style={styles.weekDay}>{weekDay}</Text> : null}
            <Text
              style={{
                color: itemColor,
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
  weekDay: {
    color: Colors.day,
    textAlign: 'center',
    fontSize: 11,
    marginBottom: -10,
    fontFamily: Styles.defaultFontFamily,
  },
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
