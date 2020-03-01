import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

import Main from '../pages/main'
import Home from '../pages/home'
import Pagina2 from '../pages/pagina2'
import Pagina3 from '../pages/pagina3'

const Tab = createBottomTabNavigator();

const menuTab = () =>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#800000',
        activeBackgroundColor: '#A9A9A9',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '#DCDCDC',
    }}>
        <Tab.Screen name="Home" component={Home}
        options={{
            tabBarVisible: true,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={'#000000'} size={40} />
            )
        }} />
        <Tab.Screen name="Pagina2" component={Pagina2}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Agenda',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" color={'#000000'} size={40} />
                )
            }}/>
     <Tab.Screen name="Pagina3" component={Pagina3}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Favorito',
                tabBarIcon: ({ color, size }) => (
                    <Icon  name="heartbeat" color={'#000000'} size={40} />
                )
            }}/>
             <Tab.Screen name="Main" component={Main}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'notificações',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="exclamation" color={'#000000'} size={40} />
                )
            }}/>
    </Tab.Navigator>

export default menuTab