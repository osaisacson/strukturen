import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import Goal from '../../models/goal';

export const DELETE_GOAL = 'DELETE_GOAL';
export const CREATE_GOAL = 'CREATE_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const CHANGE_GOAL_STATUS = 'CHANGE_GOAL_STATUS';
export const CHANGE_GOAL_AGREEMENT = 'CHANGE_GOAL_AGREEMENT';
export const SET_GOALS = 'SET_GOALS';

export function fetchGoals() {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const uid = userData.userId;
    // const uid = getState().auth.userId;
    // console.log(
    //   '****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************'
    // );
    // console.log(
    //   'PROBLEM: const uid = getState().auth.userId... wherever we use this line it returns: ',
    //   getState().auth.userId
    // );
    // console.log(
    //   'Updating all places where we used to have this to instead be: '
    // );
    // console.log(
    //   'const userData = await AsyncStorage.getItem('userData').then((data) => data ? JSON.parse(data) : {}); const uid = userData.userId;'
    // );
    // console.log(
    //   '****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************'
    // );

    try {
      console.log('Fetching goals...');
      const goalSnapshot = await firebase.database().ref('goals').once('value');

      if (goalSnapshot.exists) {
        const normalizedGoalData = goalSnapshot.val();
        const allGoals = [];
        const userGoals = [];

        for (const key in normalizedGoalData) {
          const goal = normalizedGoalData[key];
          const newGoal = new Goal(
            key,
            goal.ownerId,
            goal.date,
            goal.title,
            goal.text,
            goal.isDone
          );

          allGoals.push(newGoal);

          if (goal.ownerId === uid) {
            userGoals.push(newGoal);
          }
        }

        await dispatch({
          type: SET_GOALS,
          goals: allGoals,
          userGoals,
        });
        console.log(`Goals:`);
        console.log(`...${allGoals.length} total goals found and loaded.`);
        console.log(`...${userGoals.length} goals created by the user found and loaded.`);
      }
    } catch (error) {
      console.log('Error in actions/goals/fetchGoals: ', error);
      throw error;
    }
  };
}

export function unReserveGoal(id) {
  return async (dispatch) => {
    try {
      console.log(`Goal with id ${id} is expired.`);
      //Since the goals reservation date has passed and no collectingDate has been set, reset these values as:
      const updatedGoal = {
        reservedUserId: '',
        collectingUserId: '',
        newOwnerId: '',
        status: 'redo',
        readyDate: new Date().toISOString(), //Current date
        reservedDate: '',
        reservedUntil: '',
        suggestedDate: '',
        collectingDate: '',
        collectedDate: '',
        projectId: '',
        sellerAgreed: '',
        buyerAgreed: '',
      };

      console.log('Data to update expired goal with: ', updatedGoal);

      // Perform the API call - update the goal that has been expired
      const returnedGoalData = await firebase.database().ref(`goals/${id}`).update(updatedGoal);

      console.log('Data expired goal was updated to:', returnedGoalData);

      dispatch({
        type: CHANGE_GOAL_STATUS,
        pid: id,
        goalData: updatedGoal,
      });
    } catch (error) {
      console.log('Error in actions/goals/unReserveGoal: ', error);
      throw error;
    }
  };
}

export const deleteGoal = (goalId) => {
  return async (dispatch) => {
    try {
      console.log(`Attempting to delete goal with id: ${goalId}...`);
      await firebase.database().ref(`goals/${goalId}`).remove();

      dispatch({ type: DELETE_GOAL, pid: goalId });
      console.log(`...goal deleted!`);
    } catch (error) {
      console.log('Error in actions/goals/deleteGoal: ', error);
      throw new Error(error.message);
    }
  };
};

export function createGoal(title, text) {
  return async (dispatch) => {
    const currentDate = new Date().toISOString();
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const ownerId = userData.userId;

    try {
      console.log('Creating goal...');

      //First convert the base64 image to a firebase url...
      const goalData = {
        ownerId,
        date: currentDate,
        title,
        text,
      };

      const { key } = await firebase.database().ref('goals').push(goalData);

      const newGoalData = {
        ...goalData,
        id: key,
      };

      dispatch({
        type: CREATE_GOAL,
        goalData: newGoalData,
      });
      console.log(`...created new goal with id ${key}:`, newGoalData);
    } catch (error) {
      console.log('Error in actions/goals/createGoal: ', error);
      throw error;
    }
  };
}

export function updateGoal(id, title, text, isDone) {
  return async (dispatch) => {
    try {
      console.log(`Attempting to update goal with id: ${id}...`);

      const dataToUpdate = {
        title,
        text,
        isDone,
      };

      const returnedGoalData = await firebase.database().ref(`goals/${id}`).update(dataToUpdate);

      console.log(`...updated goal with id ${id}:`, returnedGoalData);

      dispatch({
        type: UPDATE_GOAL,
        pid: id,
        goalData: dataToUpdate,
      });
    } catch (error) {
      console.log('Error in actions/goals/updateGoal: ', error);
      throw error;
    }
  };
}
