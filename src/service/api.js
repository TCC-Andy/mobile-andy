import axios from 'axios';
/* localhost emulador
Ios :http://localhost:3001
Android : https://10.0.2.2:3001
Genymotion : http://10.0.3.2:3001
Link do servidor : http://tccandyapi.herokuapp.com  //tempo de resposta maior
*/

export default axios.create({
    baseURL: 'http://tccandyapi.herokuapp.com',
    timeout: 1000,
    responseType: 'json'
});