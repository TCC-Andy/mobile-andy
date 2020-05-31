import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Alert, 
  Text, 
  FlatList, 
  Dimensions 
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo';
import SliderLocations from '../componentes/sliderLocations';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card } from "react-native-elements";
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ActivIndicador from '../componentes/activIndicador'


MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
    id_conpanies:null,
    showModal:false,
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
      zoom: 11
    },
    places: [],
    services:[]
  }

  async componentDidMount() {
    this.setState({ activIndicador: !this.state.activIndicador })
    const data = {
      categoria: 'cabelereiro'
    }
    await api.get('/showCompanies', data).then((response) => {
      if (response.data.lengh != 0) {

        let places = new Array();
        response.data.forEach(data => {

          places.push(data);
        });
        this.setState({ places: places })
        this.setState({ activIndicador: !this.state.activIndicador })

      } else {
        this.setState({ activIndicador: !this.state.activIndicador })
        return showNotification(response.data.menssagem);
      }
    }).catch((error) => {
      showError('Falha na conexão')
      return this.props.navigation.navigate('Home')
      //  showError('Falha na conexão')
    });
  }


  showServices = async (_id) => {
    console.log("swoooNAPS",this.props.id_conpanies)
    this.setState({ activIndicador: !this.state.activIndicador })
    const data = {
      id: _id
    }
    await api.get('/showServices').then((response) => {
      if (response.data.lengh != 0) {

        let services = new Array();
        response.data.forEach(data => {

          services.push(data);

          console.log("MAPS SHOW----",services);
        });
        console.log("MAPS SHOW--------------------------",services);
        this.setState({ services: services })
        this.setState({ showModal: true })
        this.setState({ activIndicador: !this.state.activIndicador })
        
      } else {
        this.setState({ activIndicador: !this.state.activIndicador })
        return showNotification(response.data.menssagem);
      }
    }).catch((error) => {
      showError('Falha na conexão')
    });
  }

  alterCoordenadas = (place) => {
    // Alert.alert(place.title)
    let camera = null
    // camera = [...this.state.camera]
    if (this.state.places.zoom < 11) {
      this.state.textView = false
    } else {
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
        id={place._id.toString()}
        key={place._id.toString()}
        coordinate={place.coordenadas}
        onSelected={() => this.alterCoordenadas(place)}
      //onDeselected // para esconder modal
      >
        <View style={styles.annotationFill} >
          {this.state.textView &&
            <View style={styles.viewAnnotation} >
            </View>
          }
          <Icon name="map-marker" color={'#DC143C'} size={20} />

        </View>
        <MapboxGL.Callout title={place.descricao} />
      </MapboxGL.PointAnnotation>
    )
  }
  renderItem = ({ item }) => (
    <Card
    containerStyle={styles.card}
  >
    <View style={styles.body}>

      <View style={styles.header}>
        <Text style={styles.title} >
          {item.nome}
        </Text>
        <TouchableOpacity  style={styles.buttonServices}
          onPress={ () => this.showServices(item._id)}>
          <Text style={styles.textButton}>Servicos </Text>
        </TouchableOpacity >
      </View>

      <View style={styles.evaluation}>
        <Text style={styles.textEvaluation}>Avaliação  <Icon name="star" color={'#e7a74e'} size={15} />
        <Icon name="star" color={'#e7a74e'} size={15} />
        <Icon name="star-half-o" color={'#e7a74e'} size={15} />
         <Icon name="star-o" color={'#e7a74e'} size={15} />
         <Icon name="star-o" color={'#e7a74e'} size={15} />
          </Text>
      </View>

      <View style={styles.services}>
        <View style={styles.textSevies}>
          <Text>-----------------------------------------------</Text>
        </View>
      </View>

      <View style={styles.description}>
        <Text>{item.descricao} </Text>
      </View>

      <View style={styles.City}>
        <Text>{item.cidade } - {item.bairro}</Text>
      </View>

      <View style={styles.footer}>
        <Text>{item.rua }-{item.status }-</Text>
      </View>

    </View>


    <ModalExemplo isVisible={this.state.showModal} 
    services = {this.state.services}
      closeModal={() => this.setState({ showModal: false })} />
  </Card>
  );

  render() {
    return (
      <View style={styles.container}>
        <ActivIndicador animating={this.state.activIndicador} />
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
          <FlatList
          horizontal
            pagingEnabled={true}
            onMomentumScrollEnd={(e) => {
              let posicao =  (e.nativeEvent.contentOffset.x > 0)
              ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              : 0;
              
              setTimeout(() => {
               if(posicao > 0 && posicao < this.state.places.length){
               this.alterCoordenadas(this.state.places[posicao])
               }
              }, 500)
            }}
            data={this.state.places}
            renderItem={this.renderItem}
            keyExtractor={item => item._id.toString()}
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
    backgroundColor: 'rgba(255, 255, 255,0.9)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  card: {
    marginTop: 5,
    marginLeft: 9,
    width: Dimensions.get('window').width - 20,
    borderBottomWidth:5,
    borderRadius:5,
    borderColor:'#000000',
    backgroundColor: 'rgba(211,211,211, 0.9)'
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
    left: Dimensions.get('window').width / 2 + 40,
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