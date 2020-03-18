import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, FlatList, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo';
import SliderLocations from './sliderLocations';
import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'


MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
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
      zoom: 11
    },
    places: []
  }

  async componentDidMount() {
    const data = {
      categoria: 'cabelereiro'
    }
    await api.get('/showCompanies',data).then((response) => {
      if (response.data.lengh != 0) {

        let places = new Array();
        response.data.forEach(data => {

          console.log(data.coordenadas);

          places.push(data);

          console.log(places);
        });
        this.setState({ places: places })
        showSuccess(places[0].categoria);

      } else {
        return showNotification(response.data.menssagem);
      }
    }).catch((error) => {
      showError('Falha na conexão')
      return this.props.navigation.navigate('Home')
      //  showError('Falha na conexão')
    });
  }


  alterCoordenadas = (place) => {
    // Alert.alert(place.title)
    let camera = null
    // camera = [...this.state.camera]
    if(this.state.places.zoom < 11){
    this.state.textView = false
    }else{
      this.state.textView = true
    }
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
        coordinate={place.coordenadas}
        onSelected={() => this.alterCoordenadas(place)}
      //onDeselected // para esconder modal
      >
        <View style={styles.annotationFill} >
        {this.state.textView &&
          <View style={styles.viewAnnotation} >
            <Text style={styles.texAnnotation}>{place.nome}</Text>
          </View>
           }
          <Icon name="map-marker" color={'#DC143C'} size={20} />

        </View>
        <MapboxGL.Callout title={place.descricao} />
      </MapboxGL.PointAnnotation>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={m => (this.map = m)}
          style={styles.containerMaps}
          showUserLocation={true}
          styleURL={MapboxGL.StyleURL.TrafficNight}// stret/ satellite TrafficNight
          attributionPosition={{ top: 8, left: 8 }}  //canto superior esquerda
          logoEnabled={false} // tirar o logo do mapa
        >

          <MapboxGL.Camera
            centerCoordinate={this.state.camera.coordenadas}
            zoomLevel={this.state.camera.zoom}
            pitch={15}
            heading={5}
            animationMode='easeTo'
            animationDuration={3000}
          >
          </MapboxGL.Camera>

          {this.state.places.map(place => this.renderAnnotations2(place))}

        </MapboxGL.MapView>
        <View style={styles.markerAnotacion}>
          <SliderLocations data={this.state.places} alterCoordenadas={this.alterCoordenadas.bind(this)} />
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
    backgroundColor: '#C0C0C0',
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
    paddingLeft: -20,
    paddingBottom: 20,
    backgroundColor: 'rgba(2555, 255, 255, 0.6)'
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
      {       //","
        id: '1',// id poara busaca servico depois
        title: 'Casa do Bruno',//E Nome Empresa -> so agora pensei nisso
        description: 'Proximo a BR 277...',
        cidade:'Curitiba',
        bairro:'Cajuru',
        rua:'Rua Goiania',
        numero:'696',
        complemento:'casa',
        coordenadas: [-49.22044516, -25.45575244],
      },
      {
        id: '2',
        title: 'casa do Thiago',
        description: 'Localizado proximo a Fapi',
        cidade:'Pinhais',
        bairro:'Weissopolis',
        rua:'Rua do Thiago',
        numero:'500',
        complemento:'casa',    //"",""
        coordenadas: [-49.188162, -25.452379],

      },
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