import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{ headerShown: false }}
          />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
