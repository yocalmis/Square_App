String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
