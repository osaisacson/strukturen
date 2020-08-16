import React from 'react';
import { View } from 'react-native';
import ActivityRings from 'react-native-activity-rings';

import Colors from './../../constants/Colors';

const Rings = () => {
  const activityData = [
    { label: 'YEAR', value: 0.2, color: Colors.year, backgroundColor: '#ffffff' },
    { label: 'MONTH', value: 0.4, color: Colors.month, backgroundColor: '#ffffff' },
    { label: 'DAY', value: 0.8, color: Colors.day, backgroundColor: '#ffffff' },
  ];

  const activityConfig = {
    width: 100,
    height: 100,
    ringSize: 6,
  };

  return (
    <View>
      <ActivityRings data={activityData} config={activityConfig} />
    </View>
  );
};

export default Rings;
