import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import HorizontalScroll from '../components/wrappers/HorizontalScroll';
import Colors from '../constants/Colors';

const HomeScreen = (props) => {
  //TBD: Find a better solution for this. Currently the user object does not update if we don't pull in all profiles
  const currentProfileForId = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfileForId.profileId;
  const currentProfile = useSelector((state) =>
    state.profiles.allProfiles.find((profile) => profile.profileId === loggedInUserId)
  );

  //Gets all goals
  const availableGoals = useSelector((state) => state.goals.availableGoals);

  //Gets all goals by the logged in user
  const userGoals = availableGoals.filter((prod) => prod.ownerId === loggedInUserId);

  //Navigate to the edit screen and forward the goal id
  const editProfileHandler = () => {
    props.navigation.navigate('EditProfile', { detailId: currentProfile.id });
  };

  return (
    <View>
      <IconButton icon="settings" color={Colors.primary} size={20} onPress={editProfileHandler} />
      <HorizontalScroll scrollData={userGoals} renderedItemType="goals" />
    </View>
  );
};

export default HomeScreen;
