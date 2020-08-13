import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { DetailWrapper } from '../../components/wrappers/DetailWrapper';

const GoalDetailScreen = (props) => {
  //Get goal and owner id from navigation params (from parent screen) and current user id from state
  const goalId = props.route.params.detailId;

  //Find us the goal that matches the current goalId
  const selectedGoal = useSelector((state) =>
    state.goals.availableGoals.find((prod) => prod.id === goalId)
  );

  if (!selectedGoal) {
    return null;
  }

  const { title, text } = selectedGoal;

  return (
    <DetailWrapper>
      <View>
        <Text>{title}</Text>
        <Text>{text}</Text>
      </View>
    </DetailWrapper>
  );
};

export default GoalDetailScreen;
