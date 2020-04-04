import React, { Component } from "react";
import {Alert, FlatList, Text, Dimensions, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

import ModalExemplo from '../componentes/ModalExemplo';

export default class SliderLocations extends Component {

  state = {
    data: this.props.data,
    showModal: false,
  }
  // height: Dimensions.get('window').height/2-50 
  render() {
    const t = Dimensions.get('window').width;
    return (
      <FlatList 
      ref={l => (this.list = l)}
      initialScrollIndex
      onMomentumScrollEnd={(e) => {
        let posicao =  (e.nativeEvent.contentOffset.x > 0)
        ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
        : 0;
        
        setTimeout(() => {
         if(posicao > 0 && posicao < this.state.data.length){
         this.props.alterCoordenadas(this.state.data[posicao])
         }
        }, 500)
      }}
      pagingEnabled={true}
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {

          return (

            <Card
              containerStyle={styles.card}
            >
              <View style={styles.body}>

                <View style={styles.header}>
                  <Text style={styles.title} >
                    {rowData.nome}
                  </Text>
                  <TouchableOpacity style={styles.buttonServices}
                    onPress={() => this.setState({ showModal: true })}>
                    <Text style={styles.textButton}>Servicos </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.evaluation}>
                  <Text style={styles.textEvaluation}>avaliacao * * * * * </Text>
                </View>

                <View style={styles.services}>
                  <View style={styles.textSevies}>
                    <Text>-----------------------------------------------</Text>
                  </View>
                </View>

                <View style={styles.description}>
                  <Text>{rowData.descricao} </Text>
                </View>

                <View style={styles.City}>
                  <Text>{rowData.cidade } - {rowData.bairro}</Text>
                </View>

                <View style={styles.footer}>
                  <Text>{rowData.rua }-{rowData.status }-</Text>
                </View>

              </View>


              <ModalExemplo isVisible={this.state.showModal}
                closeModal={() => this.setState({ showModal: false })} />
            </Card>


          );
        }}
        keyExtractor={(item, index) => index}  
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginLeft: 9,
    width: Dimensions.get('window').width - 20,
    borderBottomWidth:5,
    borderRadius:5,
    borderColor:'#000000'
  },
  body: {
   
  },
  header: {
    marginTop: 0,
    marginLeft: 0,
    marginTop: -10,
    marginBottom: 10,
  },
  evaluation: {
    marginTop: -10,
    marginLeft: 0,
  },
  textEvaluation: {
    fontSize: 18,
    marginLeft: 0,
  },
  services: {
    
    marginTop: 0,
    marginLeft: 0,
  },
  city: {
    //  flex: 1,
    marginTop: 0,
    marginLeft: 0,
  },
  footer: {
    //    flex: 1,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    fontSize: 20
  },
  textButton: {
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 + 60,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    borderRadius: 3,
    width: 90,
    paddingBottom: 5,
  },
  buttonServices: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 + 60,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    borderRadius: 3,
    width: 90,
    paddingBottom: 5,

  },
  titleView: {

  },
  textSevies: {
    fontSize: 30,
  }
})
