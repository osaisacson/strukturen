import moment from 'moment';
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import Goal from '../components/UI/Goal';
import Rings from '../components/UI/Rings';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const HomeScreen = (props) => {
  //TBD: Find a better solution for this. Currently the user object does not update if we don't pull in all profiles
  const currentProfileForId = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfileForId.profileId;
  const currentProfile = useSelector((state) =>
    state.profiles.allProfiles.find((profile) => profile.profileId === loggedInUserId)
  );

  const today = moment().format('YYYY-MM-DD');

  const [currentYear, setCurrentYear] = useState(moment().year());
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMM'));
  const [currentDay, setCurrentDay] = useState(today);
  const [detailText, setDetailText] = useState('');

  const yearGoals = [
    { id: '1', year: 2020, text: 'Göra så mycket bättre' },
    { id: '2', year: 2021, text: 'Göra ännuså mycket bättre' },
  ];

  const monthGoals = [
    { id: '3', year: 2020, month: 'Jan', text: 'Göra så mycket bättre' },
    { id: '54', year: 2020, month: 'Feb', text: 'Göra ännuså mycket bättre' },
    { id: '6', year: 2020, month: 'Mar', text: 'Göra ännuså mycket bättre' },
    { id: '33', year: 2020, month: 'Apr', text: 'Göra ännuså mycket bättre' },
    { id: '63', year: 2020, month: 'Maj', text: 'Göra ännuså mycket bättre' },
    { id: 'r2', year: 2020, month: 'Aug', text: 'Göra ännuså mycket bättre' },
    { id: '46', year: 2020, month: 'Dec', text: 'Göra ännuså mycket bättre' },
    { id: 'r4', year: 2021, month: 'Feb', text: 'Göra ännuså mycket bättre' },
  ];

  const yesterday = moment().subtract(1, 'days');

  const dayGoals = [
    {
      date: today,
      id: '36',
      year: moment().year(),
      month: moment().format('MMM'),
      day: moment().date(),
      weekDay: moment().format('dddd'),
      text: 'Göra så mycket bättre',
    },
    {
      date: yesterday,
      id: '53',
      year: yesterday.year(),
      month: yesterday.format('MMM'),
      day: yesterday.date(),
      weekDay: yesterday.format('dddd'),
      text: 'Göra så mycket bättre',
    },
  ];

  //Change current day, month, year based on what the user has selected
  const currentYearGoal = yearGoals.find((yearGoal) => yearGoal.year === currentYear);
  const currentMonthGoal = monthGoals.find((monthGoal) => monthGoal.month === currentMonth);
  const currentDayGoal = dayGoals.find((dayGoal) => dayGoal.date === currentDay);

  //Navigate to the edit screen and forward the profile id
  const editProfileHandler = () => {
    props.navigation.navigate('EditProfile', { detailId: currentProfile.id });
  };

  return (
    <>
      <View style={styles.ringContainer}>
        <Rings />
      </View>
      <View>
        <Card style={{ ...styles.centered, ...styles.meSection }}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1580715911279-6bc35abc2e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2780&q=80',
            }}
            style={{
              position: 'absolute',
              height: Styles.meHeight,
              width: Styles.meHeight,
            }}
          />
          <Text style={styles.meText}>Me</Text>
        </Card>
        <Card style={{ top: Styles.amTop, ...styles.ampmSection }}>
          <Text style={styles.ampmText}>AM</Text>
        </Card>
        <ScrollView
          style={Styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}>
          <Goal isYear goal={currentYearGoal ? currentYearGoal : {}} key="1" />
          <Goal isMonth goal={currentMonthGoal ? currentMonthGoal : {}} key="2" />
          <Goal isDay goal={currentDayGoal ? currentDayGoal : {}} key="3" />
        </ScrollView>
        <Card style={{ top: Styles.pmTop, ...styles.ampmSection }}>
          <Text style={styles.ampmText}>PM</Text>
        </Card>
        <IconButton
          style={styles.settingsButton}
          icon="settings"
          color={Colors.primary}
          size={20}
          onPress={editProfileHandler}
        />
        <Text style={styles.detailText}>{detailText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  meSection: {
    margin: Styles.homeMargin,
    padding: 20,
    width: Styles.meHeight,
    height: Styles.meHeight,
  },
  meText: {
    backgroundColor: '#fff',
    fontFamily: Styles.defaultFontFamily,
    fontSize: 40,
    marginRight: 90,
    borderRadius: 5,
  },
  ringContainer: { position: 'absolute', top: 25, right: Styles.homeMargin },
  scrollView: {
    height: Styles.homeMargin + Styles.goalHeight + Styles.homeMargin,
  },
  ampmSection: {
    position: 'absolute',
    left: Styles.meHeight + Styles.homeMargin,
    margin: Styles.homeMargin,
    padding: 10,
    width: Styles.goalHeight,
    height: Styles.goalHeight,
  },
  ampmText: {
    color: Colors.day,
    fontFamily: Styles.defaultFontFamily,
    fontSize: 40,
    textAlign: 'center',
    marginTop: 15,
  },
  settingsButton: {
    position: 'absolute',
    top: 7,
    right: 6,
    zIndex: 100,
  },
  detailText: {
    marginTop: 100,
    padding: 10,
  },
});

export default HomeScreen;
