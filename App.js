import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes";
import { StatusBar } from 'expo-status-bar';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Routes />
        
      </NavigationContainer>
    )
  }
}


export default App;