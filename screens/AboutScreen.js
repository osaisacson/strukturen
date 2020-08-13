import React from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          style={styles.logoLarge}
          source={require('./../assets/icon.png')}
        />
        <Paragraph style={{ ...styles.paragraph, textAlign: 'center' }}>
          Strukturen är skapad 2020 av Ratatosk med stöd av en vilja av schtål.
        </Paragraph>
        <Paragraph style={{ ...styles.paragraph, textAlign: 'center' }}>
          Målet är att samla lärdomar från Monkey Mindset.
        </Paragraph>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 15,
  },
  sectionContainer: { marginTop: 80 },
  largeHeader: {
    marginHorizontal: 15,
    fontFamily: Styles.defaultFontFamily,
    fontSize: 35,
    marginVertical: 15,
  },
  header: {
    fontFamily: Styles.defaultFontFamily,
    fontSize: 22,
  },
  headerContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paragraph: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  link: { color: Colors.primary, fontFamily: 'roboto-bold' },
  logoLarge: { width: 200, height: 200, alignSelf: 'center' },
  logoSmall: { width: 80, height: 100 },
});

export default AboutScreen;
