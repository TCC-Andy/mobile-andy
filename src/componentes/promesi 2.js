async yourReactClassFunction(){
  try{
      let getAuth = await axios.get('/auth');

      //if login not successful return;

      let result = await Promise.all([axios.get('/preferences'), axios.get('/roles')]);

      //Do whatever with the results.

  }catch(e){
      //TODO error handling
  }
}



//5===============================================

function resolverDepoisDe2Segundos(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function adicionar1(x) {
  var a = resolverDepoisDe2Segundos(20);
  var b = resolverDepoisDe2Segundos(30);
  return x + await a + await b;
}

adicionar1(10).then(v => {
  console.log(v);  // exibe 60 depois de 2 segundos.
});

async function adicionar2(x) {
  var a = await resolverDepoisDe2Segundos(20);
  var b = await resolverDepoisDe2Segundos(30);
  return x + a + b;
}

adicionar2(10).then(v => {
  console.log(v);  // exibe 60 depois de 4 segundos.
});




//exx 2

const numbers = [1, 2, 3, 4];

async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//pretend show number async
async function showNumber(l) {
  return new Promise((resolve) => {
    setTimeout(() => { console.log(numbers[l]); resolve(); });
  });
}

async function doNumbers() {
  for (let l = 0; l < numbers.length; l ++) {
    await delay(4000);
    await showNumber(l);    
  }
  console.log("Done");
}

doNumbers();


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



    /**data  {"dataAgenda": "2020/06/24", "idEmpresa": "5ecab500563c112a70493769", 
"idServico": "5ee671adce25271560fb58ea", "tempoServico": "00:30"} */
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
           // showError('Falha na conexão')
          });

    }




    busca = async () => {
      return new Promise((resolve) => {
          setTimeout(() => {

              console.log('antes')
              let response = this.showNumber()
              console.log('resbus' + Object.values(response))

                  
                  ; resolve();
          });
      });
  }

  doNumbers = async () => {
    console.log('antes')
    let agenda = await showNumber()
    console.log('age' + agenda)
    // this.setState({ agenda: agenda })

}