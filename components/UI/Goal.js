import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from './Card';
import TouchableCmp from './TouchableCmp';

const Goal = ({ navigation, itemData }) => {
  const onSelect = () => navigation.navigate('EditGoal');

  const { title, text } = itemData;

  return (
    <View style={styles.container}>
      <Card style={styles.goal}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={onSelect} useForeground>
            {title ? <Text>{title}</Text> : null}
            {text ? <Text>{text}</Text> : null}
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
    height: 100,
    width: 100,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  touchable: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Goal;
