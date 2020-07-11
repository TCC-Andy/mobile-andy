import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoutesDrawer from './routesDrawer'
import Login from '../pages/login'
import Maps from '../pages/Maps'; 
import MapsParemetros from '../pages/MapsComParametros';
import MapsFavoritos from '../pages/MapsFavoritos';
import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

const menuStackLogin =
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
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'rgba(0,0,0, 0.8)'
          }
        }} />
      <Stack.Screen name="Localização" component={MapsParemetros}
        options={{
          headerShown: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'rgba(0,0,0, 0.8)'
          }
        }} />
        <Stack.Screen name="Maps Favoritos" component={MapsFavoritos}
        options={{
          headerShown: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'rgba(0,0,0, 0.8)'
          }
        }} />
    </Stack.Navigator>
  </NavigationContainer>

const menuStackHome =
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
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
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#808080'
          }
        }} />
      <Stack.Screen name="Localização" component={MapsParemetros}
        options={{
          headerShown: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#808080'
          }
        }} />
        <Stack.Screen name="Maps Favoritos" component={MapsFavoritos}
        options={{
          headerShown: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#808080'
          }
        }} />
    </Stack.Navigator>
  </NavigationContainer>

console.log();
const menuStack = menuStackLogin
const userGet = null

async () => {
  try {
    userGet = await AsyncStorage.getItem('user');
  } catch (error) {
    console.log(error);
  }
}

if (userGet !== null) {
  menuStack = menuStackHome
}
export default App = () => menuStack






/*
<Stack.Screen name="Maps" component={Maps}
        options={{
          headerShown: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#808080'
          }
        }} /> */