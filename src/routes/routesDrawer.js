import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'

const Drawer = createDrawerNavigator();


const menuDrawer = () =>
<Drawer.Navigator>
        <Drawer.Screen name="pagina2" component={Pagina2}  />
        <Drawer.Screen name="pagina3" component={Pagina3} />
      </Drawer.Navigator>

export default menuDrawer