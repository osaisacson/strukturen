import Goal from '../../models/goal';
import { DELETE_GOAL, CREATE_GOAL, UPDATE_GOAL, SET_GOALS } from '../actions/goals';
import { getIndex, updateCollection } from '../helpers';

const initialState = {
  availableGoals: [],
  userGoals: [],
  loading: false,
};

export default (state = initialState, action) => {
  //Switch cases
  switch (action.type) {
    case SET_GOALS:
      return {
        availableGoals: action.goals,
        userGoals: action.userGoals,
      };
    case CREATE_GOAL: {
      const newGoal = new Goal(
        action.goalData.id,
        action.goalData.ownerId,
        action.goalData.date,
        action.goalData.title,
        action.goalData.text,
        action.goalData.isDone
      );
      console.log('store/reducers/goals/CREATE_GOAL, new goal: ', newGoal);
      return {
        ...state,
        availableGoals: state.availableGoals.concat(newGoal),
        userGoals: state.userGoals.concat(newGoal),
      };
    }
    case UPDATE_GOAL: {
      const userGoalIndex = getIndex(state.userGoals, action.pid);
      const updatedUserGoal = new Goal( //Whenever we do a new goal we have to pass the full params to match model
        action.pid,
        state.userGoals[userGoalIndex].ownerId,
        action.goalData.date,
        action.goalData.title,
        action.goalData.text,
        action.goalData.isDone
      );
      console.log('store/reducers/goals/UPDATE_GOAL, updated goal: ', updatedUserGoal);

      //Update state
      const updatedAvailableGoals = updateCollection(
        state.availableGoals,
        action.pid,
        updatedUserGoal
      );
      const updatedUserGoals = updateCollection(state.userGoals, action.pid, updatedUserGoal);

      return {
        ...state,
        availableGoals: updatedAvailableGoals,
        userGoals: updatedUserGoals,
      };
    }

    case DELETE_GOAL:
      return {
        ...state,
        availableGoals: state.availableGoals.filter((goal) => goal.id !== action.pid),
        userGoals: state.userGoals.filter((goal) => goal.id !== action.pid),
      };
  }
  return state;
};
