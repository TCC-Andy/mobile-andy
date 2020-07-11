import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../pages/login'
import ButtonsHome from './buttonsHome'
import App from '../componentes/ex/refres11'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={ButtonsHome} />
    <Drawer.Screen name="Termo de uso" component={App} />
    <Drawer.Screen name="SAIR" component={Login} />
  </Drawer.Navigator>

export default menuDrawer