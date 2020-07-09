import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

import Perfil from '../pages/perfil'
import Home from '../pages/home'
import Agenda from '../pages/agenda'
import Favorito from '../pages/favorito'

const Tab = createBottomTabNavigator();

const menuTab = () =>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#800000',
        activeBackgroundColor: '#FFFFFF',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: 'rgba(176,224,230, 1)',
    }}>
        <Tab.Screen name="Home" component={Home}
        options={{
            tabBarVisible: true,
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={'#000000'} size={40} />
            )
        }} />
        <Tab.Screen name="Agenda" component={Agenda}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Agenda',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" color={'#000000'} size={38} />
                )
            }}/>
     <Tab.Screen name="Favorito" component={Favorito}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Favorito',
                tabBarIcon: ({ color, size }) => (
                    <Icon  name="heartbeat" color={'#000000'} size={38} />
                )
            }}/>
             <Tab.Screen name="Perfil" component={Perfil}
            options={{
                tabBarVisible: true,
                tabBarLabel: 'Perfil',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="user" color={'#000000'} size={38} />
                )
            }}/>
    </Tab.Navigator>

export default menuTab