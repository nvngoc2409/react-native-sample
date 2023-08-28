export interface IApplicationData {
  // TODO any
  staticData?: any;
  // TODO any
  currentUser?: any;

  // TODO any
  userData?: any;
}

export interface IApplicationContext extends IApplicationData {
  // TODO any
  setUserData: (userData: any) => void;
  // TODO any
  setCurrentUser: (newData: any) => void;
  // TODO any
  setStaticData?: (data: any) => void;
}
