import React from 'react'
import { Text } from 'react-native'
import Padrao from '../estilo/Padrao'

//export se tiver default nao preciso colocar nome senao eu tenhop q colocar nome ou fazer um const

/*export*/ const Inverter = prosp =>{
    const inv = prosp.texto.split('').reverse().join('')
   return <Text style= {Padrao.ex} > {inv} </Text>
}

/*export*/ const MegaSena = prosp => {
    const [min,max] = [1, 60]
    const numeros = Array(prosp.numero || 6).fill(0)

    for(let i= 0; i< numeros.length; i++){
        let novo = 0
        while(numeros.includes(novo)){
            novo = Math.floor(Math.random() * (max-min + 1))+min
        }
        numeros[i] = novo
    }
    numeros.sort((a, b)=> a - b)
    return <Text style={Padrao.ex}> { numeros.join(', ') } </Text>
}

export default Inverter // pode ser assim ou sem o default mas dai ser obrigatorio us de chaves { }
export {Inverter, MegaSena }