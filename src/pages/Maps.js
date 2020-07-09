import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Text,
  FlatList,
  Dimensions,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo';
import SliderLocations from '../componentes/sliderLocations';
import Icon from 'react-native-vector-icons/FontAwesome'
import Image from "react-native-elements";
import { Card } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ActivIndicador from '../componentes/activIndicador'
import * as Animatable from 'react-native-animatable';
import separadorImage from '../../assets/imgs/botaoDireita.png'



MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
    index: 0,
    id_conpanie: null,
    showModal: false,
    activIndicador: false,
    textView: false,
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    camera: {
      coordenadas: [-49.219982, -25.455471],
      zoom: 9
    },
    places: [],
    services: []
  }

  async componentDidMount() {
    this.setState({ activIndicador: !this.state.activIndicador })
    // console.log('catttttee goiooi ->'+this.props.route.params.categoria)
    var categoria = this.props.route.params.categoria


    await api.get(`/showCategories/${categoria}`).then((response) => {

      if (response.data.length != 0) {

        let places = new Array();
        response.data.forEach(data => {

          places.push(data);

        });
        this.setState({ places: places })
        this.setState({ activIndicador: !this.state.activIndicador })

      } else {
        this.setState({ activIndicador: !this.state.activIndicador })
        showNotification('Nenhum serviço nessa categoria no momento');
        return this.props.navigation.navigate('Home')
      }
    }).catch((error) => {
      console.log(error)
      showError('Falha na conexão')
      this.setState({ activIndicador: !this.state.activIndicador })
      return this.props.navigation.navigate('Home')
      //  showError('Falha na conexão')
    });
  }

  showServices = async (_id) => {
    //_id = 1
    await this.setState({ id_conpanie: _id })
    // await this.setState({ showModal: true })
    try {

      let response = await api.get(`/showCompanyServices/${_id}`)
      if (response.data.mensagem === undefined) {
        await this.setState({ services: response.data.servicos })

        await console.log('*/*/ ' + response.data.servicos)
        await console.log('*/*/*/*/*/*/*/ njnjnjnjnjnjnjn')

      } else {

        showNotification(response.data.mensagem);
      }
      //this.setState({ activIndicador: !this.state.activIndicador })
      await this.setState({ showModal: true })
    } catch (e) {
      console.log(e)
      showError('Falha na conexão')
      this.setState({ activIndicador: false })
    }
  }

  addFavorito = async (idEmpresa) => {

    this.setState({ activIndicador: !this.state.activIndicador })
    try {
      let user = await AsyncStorage.getItem('user')
      var userParse = JSON.parse(user);
      var idCliente = userParse._id
      const data = {
        idCliente: idCliente,
        idEmpresa: idEmpresa,
        flag: 1
      }
      let response = await api.post('/checkFavorite', data)
      showSuccess(response.data.mensagem);

      this.setState({ activIndicador: !this.state.activIndicador })

    } catch (e) {
      console.log(e)
      showError('Falha na conexão')
      this.setState({ activIndicador: false })
    }
  }

  alterCoordenadas = (place) => {
    let camera = null

    camera = {
      coordenadas: place.coordenadas,
      zoom: 12
    }
    this.setState({ camera })
  }

  alterarPosicao = (place, index) => {
    this.myscrollToIndex(index)
    this.alterCoordenadas(place)
  }
  renderAnnotations2(place, index, data) {
    return (
      <MapboxGL.PointAnnotation
        ref={p => (this.place = p)}
        id={place._id}
        key={place._id}
        coordinate={place.coordenadas.map(coor => parseFloat(coor))}
        //onDeselected={() => this.myscrollToIndex(index)}
        onSelected={() => this.alterarPosicao(place, index)}
      >
        <View style={styles.annotationFill} >
          <Icon name="map-marker" color={'#DC143C'} size={20} />

        </View>
        <MapboxGL.Callout style={{ height: 80, width: 100 }} title={place.nome} />
      </MapboxGL.PointAnnotation>
    )
  }

  renderItem = ({ item, index }) => (
    console.log('item ' + this.state.places.length + ' indez x' + index),
    <View
      style={styles.card}
    >
      <View style={styles.body}>
        <View style={styles.services}>
          {index != 0 &&
            <TouchableOpacity style={styles.buttonAnterior}
              onPress={() => this.alterarPosicao(item, index - 1)}>

              <View style={styles.icone}>
                {/* <Icon name='long-arrow-left'
                size={13} color='black' /> */}
              </View>
              <View style={styles.espacamento}></View>
              <View style={styles.icone}>
                <Icon name='angle-left'
                  size={25} color='black' />
              </View>
              <View style={styles.espacamento}></View>
              <View style={styles.icone}>
                {/* <Icon name='long-arrow-left'
                size={13} color='black' /> */}
              </View>

            </TouchableOpacity >
          }
          <View style={styles.entreButuns}>
            <View style={styles.bodyCentral}>
              <View style={styles.headerTotal}>
                <View style={styles.header}>
                  <View style={styles.textFavorito} >
                    <Text style={styles.title} >
                      {item.nome}
                    </Text>
                    <View style={styles.buttonFavorito}>
                      <TouchableOpacity
                        onPress={() => this.addFavorito(item._id)}>
                        <Icon name="heart" color={'#FA8072'} size={20} />
                      </TouchableOpacity >
                    </View>
                  </View>

                  <View style={styles.buttonServices}>
                    <TouchableOpacity
                      onPress={() => this.showServices(item._id)}>
                      <Text style={styles.textButton}>Serviços </Text>
                    </TouchableOpacity >
                  </View>


                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center', marginTop: 10 }} />
              </View>

              <View style={styles.description}>
                <Text style={{fontSize:17}}>{item.descricao} </Text>
              </View>
              <Text>Contato: {item.telefone}</Text>
              <View style={styles.footer}>
                <Text>{item.rua} - {item.numero} </Text>
                <View style={styles.City}>
                  <Text>{item.bairro} - {item.cidade}</Text>
                </View>
              </View>

            </View>
          </View>

          {index != (this.state.places.length - 1) &&
            <TouchableOpacity style={styles.buttonProximo}
              onPress={() => this.alterarPosicao(item, index + 1)}>
              <View style={styles.icone}>
                {/* <Icon name='long-arrow-right'
                  size={13} color='black' /> */}
              </View>
              <View style={styles.espacamento}></View>
              <View style={styles.icone}>
                <Icon name='angle-right'
                  size={25} color='black' />
              </View>
              <View style={styles.espacamento}></View>
              <View style={styles.icone}>
                {/* <Icon name='long-arrow-right'
                  size={13} color='black' /> */}
              </View>

            </TouchableOpacity>
          }

        </View>
      </View>
    </View>

  );
  itemSeparatorComponent = (item, data) => {
    console.log("separeator ", data, " itmm", item)
    return (
      <View></View>
    )

  }

  _keyExtractor = (item, index) => item.id;

  myscrollToIndex = (index) => {

    this.setState({ index: index });
    //Alert.alert(this.state.index.toString()
    this.flatListRef.scrollToIndex({ animated: true, index: index });
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivIndicador animating={this.state.activIndicador} />
        <ModalExemplo isVisible={this.state.showModal}
          services={this.state.services} id_conpanie={this.state.id_conpanie}
          closeModal={() => this.setState({ showModal: false })} />

        <MapboxGL.MapView
          ref={m => (this.map = m)}
          style={styles.containerMaps}
          showUserLocation={true}
          styleURL={MapboxGL.StyleURL.stret}// stret/ satellite TrafficNight
          attributionPosition={{ top: 8, left: 8 }}  //canto superior esquerda
          logoEnabled={false} // tirar o logo do mapa
        >

          <MapboxGL.Camera
            centerCoordinate={this.state.camera.coordenadas.map(coor => parseFloat(coor))}
            zoomLevel={this.state.camera.zoom}
            pitch={15}
            heading={5}
            animationMode='easeTo'
            animationDuration={3000}
          >
          </MapboxGL.Camera>

          {this.state.places.map((place, index, data) => this.renderAnnotations2(place, index, data))}

        </MapboxGL.MapView>
        <View style={styles.markerAnotacion}>

          <FlatList
            horizontal
            scrollEnabled
            automaticallyAdjustContentInsets={true}
            onScroll={(e) => { console.log('onScroll', e.nativeEvent); console.log("indexx", this.state.index) }}
            ref={(ref) => { this.flatListRef = ref; }}
            pagingEnabled={true}
            onMomentumScrollEnd={(e) => {
              // let posicao = (e.nativeEvent.contentOffset.x > 0)
              //   ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              //   : 0;
              // console.log('passssouuuuu alter coordenadas')
              //   if (posicao > 0 && posicao < this.state.places.length) {
              //     this.alterCoordenadas(this.state.places[posicao])
              //   }
            }}
            data={this.state.places}
            renderItem={this.renderItem}
            extraData={this.state.index}
            keyExtractor={this._keyExtractor}
          //getItemLayout={this.getItemLayout}
          // ItemSeparatorComponent={this.itemSeparatorComponent}
          />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerMaps: {
    flex: 2,
  },
  markerAnotacion: {
    backgroundColor: 'rgba(175,238,238, 0.4)',
    flex: 1
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    transform: [{ scale: 0.9 }],
  },
  texAnnotation: {
    color: '#FFFFFF',
  },
  viewAnnotation: {
    // paddingLeft: -20,
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  body: {
    flex: 1,
  },
  services: {
    flex: 4,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    flexDirection: "row",
    marginTop: 0,
    marginLeft: 0,
  },
  evaluation: {
    marginTop: -10,
    marginLeft: 0,
  },
  textEvaluation: {
    fontSize: 18,
    marginLeft: 0,
  },
  headerTotal: {
    flex: 1,
    flexDirection: "row"
  },
  description: {
    flex: 1,
    marginTop: 8,
  },
  city: {
    flex: 1,
    //  flex: 1,
    marginTop: 5,
    marginLeft: 0,
  },
  footer: {
    flex: 1,
    marginBottom: 20,
    marginLeft: 0,
  },
  title: {

    fontSize: 20
  },
  textFavorito: {
    flex: 3,
    flexDirection: 'row',
    fontSize: 20
  },
  textButton: {
    fontSize: 20,
  },
  bodyCentral: {
    flex: 1,
  },
  buttonProximo: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    borderRadius: 3,
  },
  entreButuns: {
    flex: 25,
    padding: '2%'
  },
  buttonAnterior:
  {
    flex: 1,
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    borderRadius: 3,


  },
  espacamento: {
    flex: 2
  },
  icone: {
    flex: 1
  },
  buttonFavorito: {
    width: 32,
    height: 32,
    left: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 3,
    justifyContent: 'center'
  },
  buttonServices: {
    width: '30%',
    // alignItems:'flex-end',
    flex: 1,
    //left: Dimensions.get('window').width / 2 + 40,
    backgroundColor: 'rgba(30,144,255,0.4)',
    borderColor: 'rgba(30,144,255,0.5)',
    borderWidth: 3,
    alignItems: 'center',
    borderRadius: 3,
    //width: 90,
    alignItems: 'center',
    paddingBottom: 5,
  },
  titleView: {

  },
  textSevies: {
    fontSize: 30,
  }
});

/*
state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    camera: {
      coordenadas: [-49.219982, -25.455471],
      zoom: 12
    },
    places: [

      {
        id: '3',
        title: 'Faculdade de Pinhais',
        cidade:'Pinhais',
        bairro:'Nao sei o bairro',
        rua:'Av Camilo de lelis',
        complemento:'Predio',
        numero:'1151',
        description: 'Um local bem localizado em Pinhais',
        coordenadas: [-49.18858051, -25.44435969],
      }
    ]
  }
*/