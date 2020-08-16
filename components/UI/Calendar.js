import dateFns from 'date-fns';

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const header = () => {
    const dateFormat = 'MMMM YYYY';
    return (
      <View>
        <IconButton icon="chevron-left" size={20} onPress={prevMonth} />
        <View>
          <Text>{dateFns.format(currentDate, dateFormat)}</Text>
        </View>
        <IconButton icon="chevron-right" size={20} onPress={prevMonth} />
      </View>
    );
  };
  const days = () => {
    const dateFormat = 'ddd';
    const days = [];
    const startDate = dateFns.startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(<Text key={i}>{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}</Text>);
    }
    return <Text>{days}</Text>;
  };
  const cells = () => {
    const monthStart = dateFns.startOfMonth(currentDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <View key={day} onClick={() => onDateClick(dateFns.parse(cloneDay))}>
            <Text>{formattedDate}</Text>
            <Text>{formattedDate}</Text>
          </View>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(<Text key={day}> {days} </Text>);
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const nextMonth = () => {
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <View>
      <View>{header()}</View>
      <View>{days()}</View>
      <View>{cells()}</View>
    </View>
  );
};
export default Calendar;
