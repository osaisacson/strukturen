import React, { useState, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import EmptyState from '../components/states/EmptyState';
import Error from '../components/states/Error';
import Loader from '../components/states/Loader';
import * as profilesActions from '../store/actions/profiles';

const AllProfilesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  //Get original profiles from state
  const profiles = useSelector((state) => state.profiles.allProfiles);

  const dispatch = useDispatch();

  //Load profiles
  const loadProfiles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      console.log('AllProfilesScreen: fetching profiles...');
      dispatch(profilesActions.fetchProfiles());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const filteredProfiles = profiles.sort(function (a, b) {
    return b.profileName - a.profileName;
  });

  const selectItemHandler = (profileId, profileName) => {
    props.navigation.navigate('Användare', {
      detailId: profileId,
      detailTitle: profileName,
    });
  };

  if (error) {
    return <Error actionOnPress={loadProfiles} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && profiles.length === 0) {
    return <EmptyState text="Hittar inga användare." />;
  }

  return (
    <View>
      <FlatList
        initialNumToRender={10}
        horizontal={false}
        numColumns={1}
        onRefresh={loadProfiles}
        refreshing={isRefreshing}
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                padding: 10,
                borderBottom: 0.2,
                borderColor: '#666',
              }}>
              {itemData.item.profileName}

              {/* <RoundItem
                key={itemData.item.profileId}
                itemData={itemData.item}
                onSelect={() => {
                  selectItemHandler(itemData.item.profileId, itemData.item.profileName);
                }}
              /> */}
              <Text style={{ alignSelf: 'center', paddingLeft: 10 }}>
                {itemData.item.profileName}
              </Text>
            </View>
            <Divider />
          </View>
        )}
      />
    </View>
  );
};

export default AllProfilesScreen;
