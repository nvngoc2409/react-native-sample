import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ApplicationRouteParamType,
  ApplicationRouteNameType,
} from './definitions';
import { HomeScreen } from './views/screens/home.screen';
import { ComicScreen } from './views/screens/comic.screen';

const Stack = createNativeStackNavigator<ApplicationRouteParamType>();

export const userRouteData: {
  name: ApplicationRouteNameType;
  component: React.ComponentType;
}[] = [
  {name: 'home', component: HomeScreen},
  {name: 'comic', component: ComicScreen},
];

export const ApplicationStackRouter = (props: {isAuthenticated: boolean}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={props.isAuthenticated ? 'home' : 'login'}>
      {userRouteData.map((item, index) => (
        <Stack.Screen<ApplicationRouteNameType>
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};
