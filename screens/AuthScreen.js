import React, { useState, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      profileName: '',
    },
    inputValidities: {
      email: false,
      password: false,
      profileName: !isSignup,
    },
    formIsValid: false,
  });

  const loginOrSignup = async (action) => {
    try {
      console.log('Attempting to dispatch either signup och login');
      const allPromises = await Promise.all([dispatch(action)]);
      return allPromises;
    } catch (error) {
      console.log('Error in attempting to to dispatch either signup och login', error);
    } finally {
      setIsLoading(false);
      console.log('.........done with attempting signup or signin!');
    }
  };

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.profileName
      );
      setIsLoading(true);
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password);
      setIsLoading(true);
    }
    setError(null);
    try {
      loginOrSignup(action); //Sign up or sign in
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (error) {
    return Alert.alert('Å Nej!', 'Något gick snett', [{ text: 'Ok' }]);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#000' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.screen}
        scrollEnabled={false}>
        <ImageBackground
          source={{
            uri:
              'https://images.unsplash.com/photo-1580715911279-6bc35abc2e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2780&q=80',
          }}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <Card style={isSignup ? styles.authContainerLarge : styles.authContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled">
              {isSignup ? (
                <>
                  <Input
                    id="profileName"
                    placeholder="Användarnamn"
                    keyboardType="default"
                    required
                    autoCapitalize="none"
                    errorText="Skriv in ett användarnamn"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </>
              ) : null}
              <Input
                id="email"
                placeholder="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Skriv in en giltig e-post, den kommer också vara ditt inloggningsnamn"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                placeholder="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Skriv in ett giltigt lösenord"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.month} />
                ) : (
                  <Button
                    color="#000"
                    mode="outlined"
                    contentStyle={{
                      justifyContent: 'center',
                      borderWidth: 0.25,
                      borderColor: !isSignup ? Colors.month : Colors.year,
                    }}
                    labelStyle={{
                      paddingTop: 13,
                      paddingBottom: 9,
                      fontFamily: Styles.defaultFontFamily,
                      fontSize: 15,
                      color: !isSignup ? Colors.month : Colors.year,
                    }}
                    onPress={authHandler}>
                    {isSignup ? 'Gå med' : 'Logga in'}
                  </Button>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color={!isSignup ? Colors.month : Colors.year}
                  mode="contained"
                  style={{
                    width: '60%',
                    alignSelf: 'center',
                  }}
                  labelStyle={{
                    color: '#fff',
                    paddingTop: 2,
                    fontFamily: Styles.defaultFontFamily,
                    fontSize: 9,
                  }}
                  compact
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}>
                  {`Byt till ${isSignup ? 'logga in' : 'skapa konto'}`}
                </Button>
              </View>
            </ScrollView>
          </Card>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const d = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: d.width,
    height: d.height,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  authContainerLarge: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 800,
    padding: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
