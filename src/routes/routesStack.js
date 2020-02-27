import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'
import routesDrawer from './routesDrawer'
import Home from '../Home'

const Stack = createStackNavigator();

const menuHome = () =>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="routesDrawer" component={routesDrawer} options={{ title: 'pagina menu' }} />
        
    </Stack.Navigator>

export default menuHome