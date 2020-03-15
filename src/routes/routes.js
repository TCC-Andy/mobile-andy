import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoutesDrawer from './routesDrawer'
import Login from '../pages/login'
import Maps from '../pages/Maps';
const Stack = createStackNavigator();

const menuStack =
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="Home" component={RoutesDrawer}
        options={{
          headerShown: false
        }} />
        <Stack.Screen name="Maps" component={Maps}
        options={{
          headerShown: true,
          headerTintColor:'#FFFFFF',
          headerStyle: {
            backgroundColor: '#808080'
          }
        }} />
    </Stack.Navigator>
  </NavigationContainer>

export default App = () => menuStack