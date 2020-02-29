import React from 'react'

import { NavigationContainer, createNavigatorFactory } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ButtonsHome from './buttonsHome'
import RoutesStack from './routesStack'

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Login from '../pages/login'
import Maps from '../Maps';
import Pagina3 from '../pages/pagina3'


const Stack = createStackNavigator();


const menuStack =
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="Home" component={ButtonsHome}
        options={{
          headerShown: true
        }} />
        <Stack.Screen name="Pagina3" component={Pagina3}
        options={{
          headerShown: true
        }} />
        
    </Stack.Navigator>
  </NavigationContainer>

export default App = () => menuStack



/* opcoes do option
options={{
          title: 'login2',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        } */