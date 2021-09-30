import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          title: "Detalhes"
        }}
      />

    </Stack.Navigator>
  );
}

export default StackRoutes;
