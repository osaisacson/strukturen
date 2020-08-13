import React from 'react';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

import AddGoal from '../../components/UI/AddGoal';
import ButtonIcon from '../../components/UI/ButtonIcon';
import HorizontalScroll from '../../components/UI/HorizontalScroll';
import ScrollViewToTop from '../../components/wrappers/ScrollViewToTop';
import Colors from '../../constants/Colors';

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
    <>
      <ScrollViewToTop>
        <View
          style={{
            paddingTop: 10,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('./../../assets/userBackground.png')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '105%',
            }}
          />
          <ButtonIcon icon="settings" color={Colors.neutral} onSelect={editProfileHandler} />
          <Title style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', marginTop: -6 }}>
            {currentProfile.profileName}
          </Title>
        </View>
        <AddGoal itemToAdd={() => props.navigation.navigate('EditGoal')} />
        <HorizontalScroll scrollData={userGoals} />
      </ScrollViewToTop>
    </>
  );
};

export default HomeScreen;
