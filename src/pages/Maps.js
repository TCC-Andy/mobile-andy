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
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo';
import SliderLocations from '../componentes/sliderLocations';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card } from "react-native-elements";
import api from '../service/api';
import { showError, showSuccess, showNotification } from '../utils/alertsUser'
import ActivIndicador from '../componentes/activIndicador'
import * as Animatable from 'react-native-animatable';



MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
    index: 0,
    id_conpanies: null,
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
   
      var categoria = 'cabelereiro'
    

    await api.get(`/showCategories/${categoria}`).then((response) => {
      console.log('dat ')
      console.log('response ' + response.data)
      if (response.data.lengh != 0) {

        let places = new Array();
        response.data.forEach(data => {

          places.push(data);
          console.log('dat' + data)
        });
        this.setState({ places: places })
        this.setState({ activIndicador: !this.state.activIndicador })

      } else {
        this.setState({ activIndicador: !this.state.activIndicador })
        return showNotification(response.data.menssagem);
      }
    }).catch((error) => {
      console.log('erooo --------------------', error)
      showError('Falha na conexão')
      this.setState({ activIndicador: !this.state.activIndicador })
      //return this.props.navigation.navigate('Home')
      //  showError('Falha na conexão')
    });
  }


  showServices = async (_id) => {
    this.setState({ activIndicador: !this.state.activIndicador })
    var id = _id
    await api.get(`/showCompanyServices/${id}`).then((response) => {
      if (response.data.lengh != 0) {

        let services = new Array();
        response.data.servicos.forEach(data => {

          services.push(data);

          //console.log("MAPS Services----",services);
        });
        //console.log("MAPS SHOW--------------------------",services);
        this.setState({ services: services })
        this.setState({ showModal: true })
        this.setState({ activIndicador: !this.state.activIndicador })

      } else {
        this.setState({ activIndicador: !this.state.activIndicador })
        return showNotification(response.data.menssagem);
        this.setState({ activIndicador: !this.state.activIndicador })
      }
    }).catch((error) => {
      console.log(error)
      showError('Falha na conexão')
    });
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
    console.log('data ------- render anoticionn---------------------------' + place)
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
        <MapboxGL.Callout style={{ height: 100, width: 100 }} title={place.descricao, index.toString()} />
      </MapboxGL.PointAnnotation>
    )
  }

  renderItem = ({ item, index }) => (
    <Card
      containerStyle={styles.card}
    >
      <View style={styles.body}>

        <View style={styles.header}>
          <Text style={styles.title} >
            {item._id}
          </Text>
          <TouchableOpacity style={styles.buttonServices}
            onPress={() => this.showServices(item._id)}>
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
          <TouchableOpacity style={styles.buttonProximo}
            onPress={() => this.alterarPosicao(item, index + 1)}>
            <Text style={styles.textButton}>proximo </Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.buttonAnterior}
            onPress={() => this.alterarPosicao(item, index - 1)}>
            <Text style={styles.textButton}>anterior </Text>
          </TouchableOpacity >
        </View>

        <View style={styles.description}>
          <Text>{item.descricao} </Text>
        </View>

        <View style={styles.City}>
          <Text>{item.cidade} - {item.bairro}</Text>
        </View>

        <View style={styles.footer}>
          <Text>{item.rua}-{item.status}-</Text>
        </View>

      </View>
    </Card>
  );
  // componentDidMount() {
  //   this.list.scrollToIndex({ animated: true,index: this.props.scrollToIndex + 2 });
  // }
  itemSeparatorComponent = (item, data) => {
    console.log("separeator ", data, " itmm", item)
    return <View style={styles.separador}>
      <Text>=</Text>
    </View>
  }
  // getItemLayout = (data, index) => (
  //   //this.state.index = index
  //   //this.state.index ={ length: 150, offset: 150 * index, index }
  //     //  console.log('iu')

  // );

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
          services={this.state.services}
          closeModal={() => this.setState({ showModal: false })} />

        <MapboxGL.MapView
          ref={m => (this.map = m)}
          style={styles.containerMaps}
          showUserLocation={true}
          styleURL={MapboxGL.StyleURL.TrafficNight}// stret/ satellite TrafficNight
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
          {/* <ScrollView horizontal= {true}
          pagingEnabled={true}
          automaticallyAdjustContentInsets={true}
          > */}
          <FlatList
            horizontal
            scrollEnabled
            automaticallyAdjustContentInsets={true}
            onScroll={(e) => { console.log('onScroll', e.nativeEvent); console.log("indexx", this.state.index) }}
            ref={(ref) => { this.flatListRef = ref; }}
            pagingEnabled={true}
            onMomentumScrollEnd={(e) => {
              let posicao = (e.nativeEvent.contentOffset.x > 0)
                ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
                : 0;
              console.log('passssouuuuu alter coordenadas')
              setTimeout(async () => {
                if (posicao > 0 && posicao < this.state.places.length) {
                  this.alterCoordenadas(this.state.places[posicao])
                }
              })
            }}
            data={this.state.places}
            renderItem={this.renderItem}
            extraData={this.state.index}
            keyExtractor={this._keyExtractor}
            //getItemLayout={this.getItemLayout}
            ItemSeparatorComponent={this.itemSeparatorComponent}
          />
          {/* </ScrollView> */}
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
    marginLeft: 0,
    // width: Dimensions.get('window').width - 20,
    borderBottomWidth: 5,
    borderRadius: 5,
    borderColor: '#000000',
    backgroundColor: 'rgba(211,211,211, 0.9)'
  },
  separador: {
    marginTop: 0,
    marginRight: 0,
    height: '100%',
    // width: 20,
    backgroundColor: 'red'
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
  description: {
    marginBottom: 20,
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
  buttonProximo: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 + 60,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    borderRadius: 3,
    width: 90,
    paddingBottom: 5,
  },
  buttonAnterior:
  {
    position: 'absolute',
    left: -15,
    backgroundColor: '#6495ED',
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