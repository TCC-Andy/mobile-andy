import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'
import ListaFlex from '../componentes/ListaFlex'
import Flex from '../componentes/Flex'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
<Drawer.Navigator>
        <Drawer.Screen name="Flex" component={Flex}  />
        <Drawer.Screen name="ListaFlex" component={ListaFlex} />
      </Drawer.Navigator>

export default menuDrawer