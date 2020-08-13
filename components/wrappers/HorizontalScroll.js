import React from 'react';
import { ScrollView, View } from 'react-native';

import Goal from '../UI/Goal';
import Styles from './../../constants/Styles';

const HorizontalScroll = ({ scrollData, getData, renderedItemType, navigation }) => {
  //Set defaults
  let RenderedComponent;
  let scrollHeight;
  let detailPath;

  //Change component to render, height of scroll and path to go to on click based on which type we want to render.
  if (renderedItemType === 'goals') {
    RenderedComponent = Goal;
    scrollHeight = Styles.goalHeight + Styles.homeMargin + Styles.homeMargin;
    detailPath = 'GoalDetail';
  }

  const selectItemHandler = (id, ownerId, title) => {
    navigation.navigate(detailPath, {
      detailId: id,
      ownerId,
      detailTitle: title,
    });
  };

  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        <View
          style={{
            flex: 1,
            height: scrollHeight,
          }}>
          {/* If dataset passed is not empty  */}
          {scrollData.length ? (
            <View
              style={{
                height: scrollHeight,
                marginTop: 20,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {scrollData.map((item) => (
                  <RenderedComponent
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
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default HorizontalScroll;
