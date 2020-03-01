import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/main'
import Pagina3 from '../pages/pagina3'
import Login from '../pages/login'
import ButtonsHome from './buttonsHome'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
  <Drawer.Navigator>
    <Drawer.Screen name="ButtonsHome" component={ButtonsHome} />
    <Drawer.Screen name="Main" component={Main} />
    <Drawer.Screen name="pagina3" component={Pagina3} />
    <Drawer.Screen name="SAIR" component={Login} />
  </Drawer.Navigator>

export default menuDrawer