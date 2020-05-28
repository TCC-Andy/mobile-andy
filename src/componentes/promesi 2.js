const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'
const axios = require('axios')    


//modele 2
const busca = () =>{
        return new Promise((resolve, reject) =>{
            try{
                const funcionarios = axios.get(url).then(resp => resp.data)
                resolve(funcionarios)
            }
            catch(e){
                reject(e)
            }
        })
     }

    async function getFuncionarios(){


      const funcionarios = await  busca().then(resp => resp)
        return funcionarios
    }

    const fcs = getFuncionarios()

    //mmodelo 3
    const busca = async () => {
        const dataGet = AsyncStorage.getItem('data');
        let agenda = new Array();
        const data = {
            idEmpresa: '5ecab500563c112a70493769',
            dataAgenda: '2020/05/26',
            idServico: '5ecab7feb7b5ec4e00e7c098',
            tempoServico: '20'
        }
        await api.post('/showDataSchedule', data).then((response) => {
        
                response.data.agenda.forEach(data => {

                    agenda.push(data);
          
                    //console.log("MAPS Services----",services);
                  });
    
                 this.setState({ agenda: agenda })
    
              
          }).catch((error) => {
            console.log(error)
            showError('Falha na conexão')
          });
    };

    const getFuncionarios = async () => await busca();

    getFuncionarios()

    //moedeloa 4

    async componentDidMount() {

        const dataGet = AsyncStorage.getItem('data');
        let agenda = new Array();
        const data = {
            idEmpresa: '5ecab500563c112a70493769',
            dataAgenda: '2020/05/26',
            idServico: '5ecab7feb7b5ec4e00e7c098',
            tempoServico: '20'
        }
        await api.post('/showDataSchedule', data).then((response) => {
        
                response.data.agenda.forEach(data => {

                    agenda.push(data);
          
                    //console.log("MAPS Services----",services);
                  });
    
                 this.setState({ agenda: agenda })
    
              
          }).catch((error) => {
            console.log(error)
            showError('Falha na conexão')
          });

    }