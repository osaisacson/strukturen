import React from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Paragraph } from 'react-native-paper';

import Colors from '../constants/Colors';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          style={{ ...styles.logoLarge, position: 'absolute', top: 0 }}
          source={require('./../assets/kretsloppan_loppan_only.png')}
        />
        <Animatable.View animation="rotate" delay={800} duration={3000} iterationCount={1}>
          <Image
            resizeMode="contain"
            style={styles.logoLarge}
            source={require('./../assets/kretsloppan_circle_only.png')}
          />
        </Animatable.View>

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
    fontFamily: 'bebas-neue-bold',
    fontSize: 35,
    marginVertical: 15,
  },
  header: {
    fontFamily: 'bebas-neue-bold',
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
