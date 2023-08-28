/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/app';
import {name as appName} from './app.json';
import { initialize } from './js/contexts';

initialize().then(()=>{
    AppRegistry.registerComponent(appName, () => App);
})

