import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routesDrawer from './routesDrawer'

const Stack = createStackNavigator();

const menuHome = () =>
    <Stack.Navigator >
        <Stack.Screen name="routesDrawer" component={routesDrawer} options={{ title: 'pagina menu' }} />        
    </Stack.Navigator>

export default menuHome