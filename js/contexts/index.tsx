import axios from 'axios';
import moment from 'moment';
// import CodePush from 'react-native-code-push';
import {APP_KEYS} from './constants';

export * from './configs';
export * from './constants';
export * from './event-emitter';
// export * from './i18n';


export const initialize = async () => {
  axios.interceptors.request.use(async config => {
    config.headers = {
      ...config.headers,
      // ...(!config.headers?.notAddAuthorization ? await headerWithJWT() : {}),
      utcoffset: moment().utcOffset(),
    } as any;
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error?.response?.status === 401) {
        // await AsyncStorage.setItem(APP_KEYS.authenticated_jwt, '');
        if (error?.request?.headers?.authorization) {
          // await AsyncStorage.setItem(APP_KEYS.authenticated_jwt, '');
          // CodePush.restartApp();
        }
      } else {
        return Promise.reject(error);
      }
    },
  );

  // TODO
  //  master data
  // check user ....

};
