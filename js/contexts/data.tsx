import React from 'react';
import {IApplicationContext} from '../definitions/data-context';

export const ApplicationContext = React.createContext<IApplicationContext>({
  // TODO any
  setCurrentUser: (_newData: any) => {},
  // TODO any
  setUserData: (_data: any) => {},
  // TODO any
  setStaticData: (_data: any) => {},
});
