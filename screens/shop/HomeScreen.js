import React from 'react';
import { View, Image } from 'react-native';
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

import ButtonIcon from '../../components/UI/ButtonIcon';
import ScrollViewToTop from '../../components/wrappers/ScrollViewToTop';
import Colors from '../../constants/Colors';

const HomeScreen = (props) => {
  //TBD: Find a better solution for this. Currently the user object does not update if we don't pull in all profiles
  const currentProfileForId = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfileForId.profileId;
  const currentProfile = useSelector((state) =>
    state.profiles.allProfiles.find((profile) => profile.profileId === loggedInUserId)
  );

  //Gets all products
  const availableProducts = useSelector((state) => state.products.availableProducts);

  //Gets all products by the logged in user
  const userProducts = availableProducts.filter((prod) => prod.ownerId === loggedInUserId);

  //COLLECTED: Gets all collected products from all products
  const collectedItemsRawAll = availableProducts.filter((product) => product.status === 'hämtad');
  const collectedItemsAll = collectedItemsRawAll.sort(function (a, b) {
    a = new Date(a.collectedDate);
    b = new Date(b.collectedDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  //COLLECTED: Gets all collected products from user products
  const collectedItemsRawUser = userProducts.filter((product) => product.status === 'hämtad');
  const collectedItemsUser = collectedItemsRawUser.sort(function (a, b) {
    a = new Date(a.collectedDate);
    b = new Date(b.collectedDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  //BY USER
  const collectedByUser = collectedItemsAll.filter(
    (product) => product.newOwnerId === loggedInUserId
  );

  //FROM USER
  const givenByUser = collectedItemsUser.filter((product) => product.newOwnerId !== loggedInUserId);

  //READY: Gets all products where the ownerId matches the id of our currently logged in user
  const userUploadsRaw = userProducts.filter(
    (product) => product.status === 'redo' || product.status === ''
  );
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

  //Navigate to the edit screen and forward the product id
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
      </ScrollViewToTop>
    </>
  );
};

export default HomeScreen;
