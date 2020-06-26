import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Perfil from '../pages/perfil'
import Favorito from '../pages/favorito'
import Login from '../pages/login'
import ButtonsHome from './buttonsHome'
import Horarios from '../componentes/ex/refreshSrollView'
import App from '../componentes/ex/refres11'
import Project from '../componentes/ex/refres22'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
  <Drawer.Navigator>
    <Drawer.Screen name="ButtonsHome" component={ButtonsHome} />
    {/* <Drawer.Screen name="Perfil" component={Perfil} /> */}
    <Drawer.Screen name="Favorito" component={Favorito} />
    <Drawer.Screen name="SAIR" component={Login} />
    <Drawer.Screen name="EXEMPLO" component={Horarios} />
    <Drawer.Screen name="refre1" component={App} />
    <Drawer.Screen name="refre2" component={Project} />
  </Drawer.Navigator>

export default menuDrawer