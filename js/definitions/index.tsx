import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export * from './data-context';
export * from './navigation';

export type StyleType<T = any> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const REQUIRED_STRING = 'REQUIRED_STRING';
export const REQUIRED_NUMBER = 99999999;
export class Config {
  code_push_key_android: string = REQUIRED_STRING;
  code_push_key_ios: string = REQUIRED_STRING;
  api_url: string = REQUIRED_STRING;
}
