import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Goal from '../../components/UI/Goal';
import Error from '../../components/states/Error';
import Loader from '../../components/states/Loader';
import * as goalsActions from '../../store/actions/goals';

const GoalsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  //Get original goals from state
  const goals = useSelector((state) => state.goals.availableGoals);

  const dispatch = useDispatch();

  //Load goals
  const loadGoals = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      console.log('Goals: fetching goals...');
      dispatch(goalsActions.fetchGoals());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const sortedGoals = goals.sort(function (a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const selectItemHandler = (id, ownerId, title) => {
    props.navigation.navigate('GoalDetail', {
      detailId: id,
      ownerId,
      detailTitle: title,
    });
  };

  if (error) {
    return <Error actionOnPress={loadGoals} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <FlatList
        numColumns={2}
        initialNumToRender={12}
        onRefresh={loadGoals}
        refreshing={isRefreshing}
        data={sortedGoals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Goal
            navigation={props.navigation}
            itemData={itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.ownerId, itemData.item.title);
            }}
          />
        )}
      />
    </View>
  );
};

export default GoalsScreen;
