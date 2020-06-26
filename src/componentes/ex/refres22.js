//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')
//import react in our code.

import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Alert,
  RefreshControl,
} from 'react-native';
//import all the components we are going to use.

export default class Project extends Component {
 
    state = { refreshing: true,
    busca:false ,
dataSource:[]};
   
  

  GetData = async () => {
    console.log('---------------------------------------------')
    try {
        let user = await AsyncStorage.getItem('user')
        var userParse = JSON.parse(user);
        var idCliente = userParse._id

        const data = {
            idCliente: idCliente,
            dataAgenda: moment(this.state.date).format('YYYY/MM/D'),
        }
        console.log('data  ', data)
        let response = await api.post('/showClientCurrentSchedule', data)
       
        console.log('------------------------------------------------>msdg ', response.data.schedule.length)
        this.setState({
                  refreshing: false,
                  //Setting the data source for the list to render
                  dataSource:  response.data
                });
                
        // await this.setState({ activIndicador: !this.state.activIndicador })
    } catch (e) {
        console.log(e)
        this.setState({ activIndicador: false })
        this.setState({ mensageErro: ' Falha na conexão' })
        showError('Falha na conexão');
    }
    //Service to get the data from the server to render
    // return fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       refreshing: false,
    //       //Setting the data source for the list to render
    //       dataSource: responseJson
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.GetData();
  }
  render() {
      if(!this.state.busca){
          this.GetData()
      }
    console.log('ctetetteteteeeee->', this.state.dataSource)
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1,  backgroundColor: "#C2185B", paddingTop: 20 }}>
        <Text> HErereree!</Text>
          <ActivityIndicator />
        </View>
      );
    }
    
    return (
      //Returning the ListView
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={({item}) => (
              <View>
            <Text>
                {item.nomeEmpresa}
             
            </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },
});

