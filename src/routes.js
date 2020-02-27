import React from 'react'

import { NavigationContainer, createNavigatorFactory } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardRoutes from './routes/dashbords'
import RoutesStack from './routes/routesStack'
import Flex from './componentes/Flex'

import Main from './pages/main'
import Pagina2 from './pages/pagina2'
import Maps from './Maps';


const Stack = createStackNavigator();


const menuStack = 
<NavigationContainer>
  <Stack.Navigator initialRouteName="pagina2">
    <Stack.Screen name="Main" component={DashboardRoutes} options={{ title: 'pagina menu' }} />
    <Stack.Screen name="pagina2" component={Pagina2} />
    <Stack.Screen name="Home" component={RoutesStack} />
    <Stack.Screen name="Maps" component={Maps} />
  </Stack.Navigator>
</NavigationContainer>

export default App = () => menuStack

