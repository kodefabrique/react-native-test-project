import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { App } from './app/App';
import './boot';

AppRegistry.registerComponent(appName, () => App);
