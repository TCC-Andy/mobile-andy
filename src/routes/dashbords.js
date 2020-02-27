import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'
import routesDrawer from './routesDrawer'

const Tab = createBottomTabNavigator();

const menuTab = () => 
<Tab.Navigator>
    <Tab.Screen name="Main" component={Main} />
    <Tab.Screen name="RoutesDrawer" component={routesDrawer} />
</Tab.Navigator>

export default menuTab