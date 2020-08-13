import React from 'react';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

import ButtonIcon from '../../components/UI/ButtonIcon';
import ScrollViewToTop from '../../components/wrappers/ScrollViewToTop';
import Colors from '../../constants/Colors';
import AddGoal from '../../components/UI/AddGoal';

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

  //COLLECTED: Gets all collected goals from all goals
  const collectedItemsRawAll = availableGoals.filter((goal) => goal.status === 'hämtad');
  const collectedItemsAll = collectedItemsRawAll.sort(function (a, b) {
    a = new Date(a.collectedDate);
    b = new Date(b.collectedDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  //COLLECTED: Gets all collected goals from user goals
  const collectedItemsRawUser = userGoals.filter((goal) => goal.status === 'hämtad');
  const collectedItemsUser = collectedItemsRawUser.sort(function (a, b) {
    a = new Date(a.collectedDate);
    b = new Date(b.collectedDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  //BY USER
  const collectedByUser = collectedItemsAll.filter((goal) => goal.newOwnerId === loggedInUserId);

  //FROM USER
  const givenByUser = collectedItemsUser.filter((goal) => goal.newOwnerId !== loggedInUserId);

  //READY: Gets all goals where the ownerId matches the id of our currently logged in user
  const userUploadsRaw = userGoals.filter((goal) => goal.status === 'redo' || goal.status === '');
  const userUploads = userUploadsRaw.sort(function (a, b) {
    a = new Date(a.readyDate);
    b = new Date(b.readyDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  //Get all projects, return only the ones which matches the logged in id
  const userProjects = useSelector((state) => state.projects.availableProjects).filter(
    (proj) => proj.ownerId === loggedInUserId
  );

  //Get user proposals
  const availableProposals = useSelector((state) => state.proposals.availableProposals);
  const userProposalsRaw = availableProposals.filter(
    (proposal) => proposal.ownerId === loggedInUserId
  );
  const userProposals = userProposalsRaw.sort(function (a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a > b ? -1 : a < b ? 1 : 0;
  });

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
      </ScrollViewToTop>
    </>
  );
};

export default HomeScreen;
