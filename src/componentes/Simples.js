import React from 'react'
import { Text } from 'react-native'
import Padrao from '../estilo/Padrao'

export default  props => 
    <Text style={Padrao.ex}> Arow {props.texto}</Text>

/* function normal 
export default function(props){  // parametrro texto que fopi pasado
    return <Text>{props.texto}</Text>
}
*/
/* function arrow com {}
export default  (props) => {
 return    <Text> Arrow {props.texto}</Text>
}
*/

// nao pode retorna mais de um componentee (2 TExt) nesse caso teeria q criar um View e retorna uma VIEW
/*
export default  props =>    
<View>
    <Text> Arrow text1 {props.texto}</Text>
    <Text> Arrow text2 {props.texto}</Text>
</View>  
*/

  