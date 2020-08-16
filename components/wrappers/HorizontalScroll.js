import React from 'react';
import { ScrollView, View } from 'react-native';

import Goal from '../UI/Goal';
import Styles from './../../constants/Styles';

const HorizontalScroll = ({ scrollData, getData, navigation }) => {
  //Set defaults
  const scrollHeight = Styles.goalHeight + Styles.homeMargin + Styles.homeMargin;
  const detailPath = 'GoalDetail';

  const selectItemHandler = (id, ownerId, title) => {
    navigation.navigate(detailPath, {
      detailId: id,
      ownerId,
      detailTitle: title,
    });
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
      <View
        style={{
          flex: 1,
          height: scrollHeight,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scrollData.map((item) => (
            <Goal
              getData={getData}
              navigation={navigation}
              itemData={item}
              key={item.id}
              onSelect={() => {
                selectItemHandler(item.id, item.ownerId, item.title);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HorizontalScroll;
