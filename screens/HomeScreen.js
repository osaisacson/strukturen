import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import Goal from '../components/UI/Goal';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const HomeScreen = (props) => {
  //TBD: Find a better solution for this. Currently the user object does not update if we don't pull in all profiles
  const currentProfileForId = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfileForId.profileId;
  const currentProfile = useSelector((state) =>
    state.profiles.allProfiles.find((profile) => profile.profileId === loggedInUserId)
  );

  const [text, setText] = useState('');

  //Gets all goals
  const availableGoals = useSelector((state) => state.goals.availableGoals);

  //Gets all goals by the logged in user
  const userGoals = availableGoals.filter((prod) => prod.ownerId === loggedInUserId);

  //Navigate to the edit screen and forward the goal id
  const editProfileHandler = () => {
    props.navigation.navigate('EditProfile', { detailId: currentProfile.id });
  };

  const getData = (val) => {
    console.log(val);
    setText(val);
  };

  return (
    <View>
      <Card
        style={{
          margin: Styles.homeMargin,
          padding: 20,
          width: Styles.meHeight,
          height: Styles.meHeight,
        }}>
        <Text style={{ fontFamily: Styles.defaultFontFamily, fontSize: 110 }}>Me</Text>
      </Card>
      <Card
        style={{
          position: 'absolute',
          left: Styles.meHeight + Styles.homeMargin,
          top: Styles.amTop,
          margin: Styles.homeMargin,
          padding: 10,
          width: Styles.goalHeight,
          height: Styles.goalHeight,
        }}>
        <Text
          style={{
            fontFamily: Styles.defaultFontFamily,
            fontSize: 40,
            textAlign: 'center',
            marginTop: 15,
          }}>
          AM
        </Text>
      </Card>
      <ScrollView
        style={{
          height: Styles.homeMargin + Styles.goalHeight + Styles.homeMargin,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Goal goal={{ title: '2020', text: 'Göra så mycket bättre' }} key="1" />
        <Goal goal={{ title: 'Aug', text: 'Starta företaget' }} key="2" />
        <Goal goal={{ title: 'v.2', text: 'Ta beslut' }} key="3" />
      </ScrollView>
      <Card
        style={{
          position: 'absolute',
          left: Styles.meHeight + Styles.homeMargin,
          top: Styles.pmTop,
          margin: Styles.homeMargin,
          padding: 10,
          width: Styles.goalHeight,
          height: Styles.goalHeight,
        }}>
        <Text
          style={{
            fontFamily: Styles.defaultFontFamily,
            fontSize: 40,
            textAlign: 'center',
            marginTop: 15,
          }}>
          PM
        </Text>
      </Card>
      <IconButton icon="settings" color={Colors.primary} size={20} onPress={editProfileHandler} />
      <Text style={{ marginTop: 100, padding: 10 }}>{text}</Text>
    </View>
  );
};

export default HomeScreen;
