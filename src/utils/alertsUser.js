import { Alert, Platform } from 'react-native'

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

export { server, showError, showSuccess,showNotification }