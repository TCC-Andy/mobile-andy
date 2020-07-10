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
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ActivIndicador from '../componentes/activIndicador'
import * as Animatable from 'react-native-animatable';
import separadorImage from '../../assets/imgs/botaoDireita.png'

MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class MapsParemetros extends Component {
  state = {
    id_conpanie: null,
    place: this.props.route.params.empresa,
    showModal: false,
    activIndicador: false,
    camera: {
      coordenadas: this.props.route.params.empresa.coordenadas,
      zoom: 12
    },
    services: []
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



  alterCoordenadas = (place) => {
    let camera = null

    camera = {
      coordenadas: place.coordenadas,
      zoom: 15
    }
    this.setState({ camera })
  }


  renderAnnotations2(place) {

    return (
      <MapboxGL.PointAnnotation
        ref={p => (this.place = p)}
        id={place._id}
        key={place._id}
        coordinate={place.coordenadas.map(coor => parseFloat(coor))}
        onSelected={() => this.alterCoordenadas(place)}
      >
        <View style={styles.annotationFill} >
          <Icon name="map-marker" color={'#DC143C'} size={20} />

        </View>
        <MapboxGL.Callout style={{ height: 80, width: 100 }} title={place.nomeEmpresa} />
      </MapboxGL.PointAnnotation>
    )
  }

  renderItem = (item) => (

    <View
      style={styles.card}
    >
      <View style={styles.body}>

        <View style={styles.services}>

          <View style={styles.entreButuns}>
            <View style={styles.bodyCentral}>
              <View style={styles.headerTotal}>
                <View style={styles.header}>
                  <Text style={styles.title} >
                    {item.nomeEmpresa}
                  </Text>

                  <View style={styles.buttonServices}>
                    <TouchableOpacity
                      onPress={() => this.showServices(item.idEmpresa)}>
                      <Text style={styles.textButton}>Servico </Text>
                    </TouchableOpacity >
                  </View>

                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center', marginTop: 10 }} />
              </View>

              <View style={styles.description}>
                <Text style={{ fontSize: 17 }}>{item.descricao} </Text>
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
        </View>
      </View>
    </View>

  );

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
          styleURL={MapboxGL.StyleURL.stret}
          attributionPosition={{ top: 8, left: 8 }}
          logoEnabled={false}
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

          {this.renderAnnotations2(this.state.place)}

        </MapboxGL.MapView>
        <View style={styles.markerAnotacion}>
          {this.renderItem(this.state.place)}
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
