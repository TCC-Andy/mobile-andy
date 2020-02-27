import React from 'react'
import {createDrawerNavigator} from 'react-navigation'
import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import { Inverter,MegaSena } from './componentes/Multi'
import Contador from './componentes/Contador'
import Plataformas from './componentes/Plataformas'
import ValidarProsp from './componentes/ValidarProsp'
import Evento from './componentes/Evento'
import { Avo } from './componentes/ComunicacaoDireta'
import TextoSincronizado from './componentes/ComunicacaoIndireta'
import ListaFlex from './componentes/ListaFlex'
import Flex from './componentes/Flex'
import Home from './Home'

export default createDrawerNavigator({
    Home: {
        screen: Home
    },
    Flex: {
        screen: Flex
    },
    ListaFlex: {
        screen: ListaFlex,
        navigationOptions: { title: 'Lista (Flex Box)' }
    },
    TextoSincronizado: {
        screen: TextoSincronizado,
        navigationOptions: { title: 'Texto Sincronizado' }
    },
    Avo:{
        screen: () => <Avo nome= 'Joao' sobrenome='Silva'/>
    },
    Evento:{
        screen:Evento
    },
    ValidarProsp: {
        screen: () => <ValidarProsp /*label='teste '*/ ano= {18}/>
    },
    Plataformas:{
        screen: Plataformas
    },
    Contador: {
        screen: () => <Contador /*numero={100}*/> </Contador>
    },
    MegaSena: {
        screen: () => <MegaSena numero= {8}></MegaSena>,
        navigationOption: { title: 'Mega Sena'} 
    },
    Inverter : {
        screen: () => <Inverter texto= 'React-native'></Inverter>
    },
    ParImpar:{
        screen: () => <ParImpar numero= {31}></ParImpar>,
        navigationOption: { title: 'Par e Impar'}
    },
    Simples:{
        screen: () => <Simples texto= 'React-native'></Simples>
    }
}, { drawerWitdth: 300})