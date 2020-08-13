import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ImagePicker from '../../components/UI/ImgPicker';
import Loader from '../../components/UI/Loader';
import PickerItem from '../../components/UI/PickerItem';
import { FormFieldWrapper, formStyles } from '../../components/wrappers/FormFieldWrapper';
import FormWrapper from '../../components/wrappers/FormWrapper';
import * as goalsActions from '../../store/actions/goals';
import { PART, CONDITION, STYLE, MATERIAL, COLOR } from '../../data/filters';

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

  const defaultAddress = currentProfile.address ? currentProfile.address : '';
  const defaultLocation = currentProfile.location ? currentProfile.location : '';
  const defaultPhone = currentProfile.phone ? currentProfile.phone : '';
  const defaultPickupDetails = currentProfile.defaultPickupDetails
    ? currentProfile.defaultPickupDetails
    : '';

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedGoal ? editedGoal.title : '',
      description: editedGoal ? editedGoal.description : '',
      background: editedGoal ? editedGoal.background : '',
      internalComments: editedGoal ? editedGoal.internalComments : '',
      length: editedGoal ? editedGoal.length : '',
      height: editedGoal ? editedGoal.height : '',
      width: editedGoal ? editedGoal.width : '',
      price: editedGoal ? editedGoal.price : '',
      priceText: editedGoal ? editedGoal.priceText : '',
      address: editedGoal ? editedGoal.address : defaultAddress, //set current address as default if have one
      location: editedGoal ? editedGoal.location : defaultLocation, //set current location as default if have one
      pickupDetails: editedGoal ? editedGoal.pickupDetails : defaultPickupDetails, //set pickup details the user entered in their profile as default if they have them
      phone: editedGoal ? editedGoal.phone : defaultPhone, //set current phone as default if have one
      image: editedGoal ? editedGoal.image : '',
      category: editedGoal ? editedGoal.category : 'Ingen',
      condition: editedGoal ? editedGoal.condition : 'Inget',
      style: editedGoal ? editedGoal.style : 'Ingen',
      material: editedGoal ? editedGoal.material : 'Blandade',
      color: editedGoal ? editedGoal.color : 'Omålad',
    },
    inputValidities: {
      title: !!editedGoal,
      description: true,
      background: true,
      internalComments: true,
      length: true,
      height: true,
      width: true,
      price: true,
      priceText: true,
      address: true,
      location: true,
      pickupDetails: true,
      phone: true,
      image: !!editedGoal,
      category: true,
      condition: true,
      style: true,
      material: true,
      color: true,
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
      Alert.alert(
        'Ojoj',
        'Det verkar som något saknas i formuläret, kolla så du fyllt i titel och lagt upp en bild.',
        [{ text: 'OK' }]
      );
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedGoal) {
        await dispatch(
          goalsActions.updateGoal(
            prodId,
            formState.inputValues.category,
            formState.inputValues.condition,
            formState.inputValues.style,
            formState.inputValues.material,
            formState.inputValues.color,
            formState.inputValues.title,
            formState.inputValues.image,
            formState.inputValues.address,
            formState.inputValues.location,
            formState.inputValues.pickupDetails,
            +formState.inputValues.phone,
            formState.inputValues.description,
            formState.inputValues.background,
            +formState.inputValues.length,
            +formState.inputValues.height,
            +formState.inputValues.width,
            +formState.inputValues.price,
            formState.inputValues.priceText,
            formState.inputValues.internalComments
          )
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
