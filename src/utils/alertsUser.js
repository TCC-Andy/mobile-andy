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
    Alert.alert('Alerta', msg)
}

    async function storeData (typeObj, objSet){
    try {
        var obj = JSON.stringify(objSet);
        await AsyncStorage.setItem(typeObj, obj);
        return 1;
    } catch (error) {
        console.log(err)
        showError('Falha ao iniciar uma nova sessao')
    }
    return 0;
}

async function retrieData (typeObj){
    try {
        const obj= null;
        const objGet = await AsyncStorage.getItem(typeObj);
    
        if (objGet !== null) {
             obj = JSON.parse(objGet);            
        }
        return objGetobjGet;
    } catch (error) {
        return 0;
    }
};

export { server, showError, showSuccess,showNotification, storeData, retrieData}