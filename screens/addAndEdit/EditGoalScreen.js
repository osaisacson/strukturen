import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Alert, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/states/Loader';
import { FormFieldWrapper, formStyles } from '../../components/wrappers/FormFieldWrapper';
import FormWrapper from '../../components/wrappers/FormWrapper';
import * as goalsActions from '../../store/actions/goals';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value, // From textChangeHandler = (inputIdentifier, text)
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

const EditGoalScreen = (props) => {
  const prodId = props.route.params ? props.route.params.detailId : null; //Get the id of the currently edited goal, passed from previous screen

  //Find the profile that matches the id of the currently logged in User
  const currentProfile = useSelector((state) => state.profiles.userProfile || {});

  //Find goal
  const loggedInUserId = currentProfile.profileId;
  const availableGoals = useSelector((state) => state.goals.availableGoals);
  const userGoals = availableGoals.filter((prod) => prod.ownerId === loggedInUserId);
  const editedGoal = userGoals.find((prod) => prod.id === prodId);

  //Set states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedGoal ? editedGoal.title : '',
      text: editedGoal ? editedGoal.text : '',
    },
    inputValidities: {
      title: !!editedGoal,
      text: !!editedGoal,
    },
    formIsValid: !!editedGoal,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Oj! Något gick fel, försök igen.', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Ojoj', 'Det verkar som något saknas i formuläret', [{ text: 'OK' }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedGoal) {
        await dispatch(
          goalsActions.updateGoal(prodId, formState.inputValues.title, formState.inputValues.text)
        );
        props.navigation.navigate('GoalDetail', { detailId: prodId });
        setIsLoading(false);
      } else {
        await dispatch(
          goalsActions.createGoal(formState.inputValues.title, formState.inputValues.text)
        );
        props.navigation.goBack();
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, prodId, formState]);

  //Manages validation of title input
  const textChangeHandler = (inputIdentifier, text) => {
    //inputIdentifier and text will act as key:value in the form reducer

    let isValid = true;

    //If we haven't entered any value (its empty) set form validity to false
    if (inputIdentifier === 'title' && text.trim().length === 0) {
      isValid = false;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormWrapper
      submitButtonText="Spara mål"
      handlerForButtonSubmit={submitHandler}
      isLoading={isLoading}>
      <FormFieldWrapper prompt="Skriv in en titel">
        <TextInput
          placeholder="Titel (max 30 bokstäver)"
          maxLength={30}
          style={formStyles.input}
          value={formState.inputValues.title}
          onChangeText={textChangeHandler.bind(this, 'title')}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
        />
      </FormFieldWrapper>
      <FormFieldWrapper prompt="Skriv in en beskrivning">
        <TextInput
          placeholder="Beskrivning"
          style={formStyles.input}
          value={formState.inputValues.text}
          onChangeText={textChangeHandler.bind(this, 'text')}
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="done"
        />
      </FormFieldWrapper>
    </FormWrapper>
  );
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.detailId ? 'Edit goal' : 'Add goal',
  };
};

export default EditGoalScreen;
