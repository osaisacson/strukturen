import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import EmptyState from '../../components/UI/EmptyState';
import Error from '../../components/UI/Error';
import Goal from '../../components/UI/Goal';
import Loader from '../../components/UI/Loader';
import SaferArea from '../../components/UI/SaferArea';
import SearchBar from '../../components/UI/SearchBar';
import * as goalsActions from '../../store/actions/goals';

const UserGoalsScreen = (props) => {
  //Get user goals from state
  const availableGoals = useSelector((state) => state.goals.availableGoals);
  const currentProfile = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfile.profileId;
  const userGoals = availableGoals.filter((prod) => prod.ownerId === loggedInUserId);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  //Prepare for changing the rendered goals on search
  const [renderedGoals, setRenderedGoals] = useState(userGoals);
  const [searchQuery, setSearchQuery] = useState('');

  //Sort goals by date
  const goalsSorted = renderedGoals.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const dispatch = useDispatch();

  const loadGoals = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      console.log('UserGoalsScreen: fetching Goals');
      dispatch(goalsActions.fetchGoals());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const searchHandler = (text) => {
    const newData = renderedGoals.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setRenderedGoals(text.length ? newData : userGoals);
    setSearchQuery(text.length ? text : '');
  };

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

  if (!isLoading && userGoals.length === 0) {
    return <EmptyState text="Inga produkter ännu, prova lägga till några." />;
  }

  return (
    <SaferArea>
      <SearchBar
        actionOnChangeText={(text) => searchHandler(text)}
        searchQuery={searchQuery}
        placeholder="Leta bland ditt återbruk"
      />

      <FlatList
        numColumns={2}
        initialNumToRender={12}
        onRefresh={loadGoals}
        refreshing={isRefreshing}
        data={goalsSorted}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Goal
            navigation={props.navigation}
            showSmallStatusIcons
            itemData={itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.ownerId, itemData.item.title);
            }}
          />
        )}
      />
    </SaferArea>
  );
};

export default UserGoalsScreen;
