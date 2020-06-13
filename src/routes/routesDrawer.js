import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Perfil from '../pages/perfil'
import Pagina3 from '../pages/pagina3'
import Login from '../pages/login'
import ButtonsHome from './buttonsHome'
import ExempploLISt from '../componentes/ex/ExFlastList'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
  <Drawer.Navigator>
    <Drawer.Screen name="ButtonsHome" component={ButtonsHome} />
    <Drawer.Screen name="Perfil" component={Perfil} />
    <Drawer.Screen name="pagina3" component={Pagina3} />
    <Drawer.Screen name="SAIR" component={Login} />
    <Drawer.Screen name="EXEMPLO" component={ExempploLISt} />
  </Drawer.Navigator>

export default menuDrawer