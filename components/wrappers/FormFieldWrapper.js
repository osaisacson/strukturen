import React from 'react';
import { View, StyleSheet } from 'react-native';

export const FormFieldWrapper = (props) => {
  return <View style={formStyles.formControl}>{props.children}</View>;
};

export const formStyles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 15,
  },
  multilineInput: {
    minHeight: 100, //... For dynamic height
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 15,
  },
});
