import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Styles from '../../constants/Styles';
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
    height: Styles.GoalHeight,
    width: '93%',
    margin: '1.5%',
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginTop: 15,
  },
  statusBadge: {
    marginLeft: 12,
    fontSize: 13,
  },
  horizontalGoal: {
    height: Styles.GoalHeight,
    width: 200,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  touchable: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden', //To make sure any child (in this case the image) cannot overlap what we set in the image container
  },
  icon: {
    position: 'absolute',
    padding: 5,
    zIndex: 99,
    shadowColor: 'black',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2, //Because shadow only work on iOS, elevation is same thing but for android.
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    color: '#000',
  },
  title: {
    paddingLeft: 4,
    width: 200,
    fontFamily: 'roboto-regular',
    fontSize: 16,
    marginLeft: 15,
  },
  backgroundText: {
    paddingLeft: 4,
    fontFamily: 'roboto-light-italic',
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 20,
  },
  date: {
    width: '100%',
    textAlign: 'right',
    marginBottom: -10,
    paddingRight: 25,
    marginTop: 10,
    fontFamily: 'roboto-light-italic',
    fontSize: 14,
  },
  location: {
    padding: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontFamily: 'roboto-bold',
    fontSize: 15,
    textAlign: 'right',
  },

  price: {
    position: 'absolute',
    right: -9,
    bottom: 0,
    padding: 5,
    zIndex: 99,
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontFamily: 'roboto-bold',
    fontSize: 15,
    textAlign: 'right',
    marginRight: 8,
  },
});

export default Goal;
