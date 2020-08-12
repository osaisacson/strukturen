import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TouchableCmp from './TouchableCmp';

const PickerItem = ({ color, isSelected, onSelect, title }) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          ...styles.touchable,
          backgroundColor: color,
          borderWidth: isSelected ? 1 : 0.5,
          height: isSelected ? 65 : 55,
        }}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: isSelected ? 'roboto-bold-italic' : 'roboto-light-italic',
                color: '#000',
              }}>
              {title}
            </Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    fontFamily: 'roboto-bold-italic',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
  },
  item: {
    minWidth: 100,
    marginLeft: 10,
  },
  touchable: {
    borderColor: '#666',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  details: {
    color: '#000',
  },
});

export default PickerItem;
