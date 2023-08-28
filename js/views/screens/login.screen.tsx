import {Button, Text} from '@ant-design/react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ApplicationNavigationProp} from '../../definitions';
import {Screen} from '../common';

export const LoginScreen = () => {
  const navigation = useNavigation<ApplicationNavigationProp>();

  const login = () => {
    navigation.dispatch(StackActions.replace('home'));
  };

  return (
    <Screen preset="auto" safeAreaEdges={['top', 'bottom']}>
      <Text>Login screen</Text>
      <Button onPress={login}>Sign In</Button>
    </Screen>
  );
};
