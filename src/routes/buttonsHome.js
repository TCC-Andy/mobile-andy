import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

import Main from '../pages/main'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'
import routesDrawer from './routesDrawer'

const Tab = createBottomTabNavigator();

const menuTab = () =>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#800000',
        activeBackgroundColor: '#C0C0C0',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '#FFFFFF',
    }}>
        <Tab.Screen name="Main" component={Main}
        options={{
            tabBarVisible: true,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={'#8B0000'} size={40} />
            )
        }} />
        <Tab.Screen name="Pagina2" component={Pagina2}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Agenda',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" color={'#8B0000'} size={40} />
                )
            }}/>
     <Tab.Screen name="Pagina3" component={Pagina3}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Favorito',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="square" color={'#8B0000'} size={40} />
                )
            }}/>
             <Tab.Screen name="routesDrawer" component={routesDrawer}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'notificacao',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="exclamation" color={'#8B0000'} size={40} />
                )
            }}/>
    </Tab.Navigator>

export default menuTab