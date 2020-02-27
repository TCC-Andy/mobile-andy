import React from 'react'
import { View , Text } from 'react-native'
import Padrao from '../estilo/Padrao'
import If from './If'
/** SERIA ASSIM com uso de uma function
 function parOuImpar(num){
    if(num % 2 == 0){ 
        return <Text style={Padrao.ex}> Par</Text>
    }else{
        return <Text style={Padrao.ex}> Impar</Text>
    }
}
*/
function parOuImpar(num){
 
    const v = num % 2 == 0 ? 'Par' : 'Impar'
    return <Text style={Padrao.ex}> {v} </Text>
}

export default props =>
<View>
    { parOuImpar(props.numero) }

    {/*
        props.numero % 2 == 0
        ? <Text style={Padrao.ex}> Par</Text>
        :  <Text style={Padrao.ex}> Impar</Text>
    */}
</View>

/*OU TAMBEM PODE SER ASSIM
</View>
    <If test={prosp.numero % 2 == 0}>  // o if tem uma funcao q retorna filhos (todos os componentes )
        <Text style={Padrao.ex}> Par</Text>
    </If>
    <If test={prosp.numero % 2 == 1}> // o if tem uma funcao q retorna filhos (todos os componentes )
        <Text style={Padrao.ex}> Impar</Text>
    </If>
</View>
*/