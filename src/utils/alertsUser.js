import { Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

//http://127.0.0.1 emulador android
const server = 'http://10.0.3.2:3001'

function showError(err) {
    Alert.alert('Falhou!', err)
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}
function showNotification(msg) {
    Alert.alert('Falhou', msg)
}

    async function storeData (userSet){
    console.log('oi storeData')

    console.log(userSet);
    try {
        var user = JSON.stringify(userSet);
        await AsyncStorage.setItem('user', user);
        console.log(user);
        return 1;
    } catch (error) {
        console.log(err)
        showError('Falha ao iniciar uma nova sessao')
    }
    console.log('tchau storeData')
    return 0;
}

async function retrieData (userSet){
    try {
        const userGet = await AsyncStorage.getItem('user');

        if (userGet !== null) {
            // Converte este json para objeto
            //var user = JSON.parse(userGet);
            
        }
    } catch (error) {
        console.log(error.message);
    }
};

export { server, showError, showSuccess,showNotification, storeData}