export {};
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

interface IApplicationRoute {
  login: any;
  register: any;
  home: any;
  comic: any
}

export type ApplicationRouteNameType = keyof IApplicationRoute;
export type ApplicationRouteParamType = IApplicationRoute & ParamListBase;
export type ApplicationNavigationProp = NavigationProp<IApplicationRoute>;

export type AppStackScreenProps<T extends keyof IApplicationRoute> =
  StackScreenProps<ApplicationRouteParamType, T>;

export const mapFunctions: {[key: string]: Function[]} = {};

export const ApplicationNavigationName: {
  [key: string]: ApplicationRouteNameType;
} = {
  login: 'login',
  register: 'register',
  home: 'home',
  comic: 'comic'
};
