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
    //_id = 1
    this.setState({ activIndicador: !this.state.activIndicador })
    try {

      let response = await api.get(`/showCompanyServices/${_id}`)
      if (response.data.mensagem === undefined) {
        await this.setState({ services: response.data.servicos })
        await this.setState({ showModal: true })
      } else {

        showNotification(response.data.mensagem);
      }
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
        <MapboxGL.Callout style={{ height: 100, width: 100 }} title={place.descricao} />
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
                  <Text style={styles.title} >
                    {item.nome}
                  </Text>

                  <View style={styles.buttonServices}>
                    <TouchableOpacity
                      onPress={() => this.showServices(item._id)}>
                      <Text style={styles.textButton}>Servicos </Text>
                    </TouchableOpacity >
                  </View>

                </View>
              </View>

              <View>
                <Text>-----------------------------------------------</Text>
              </View>


              {/* <View style={styles.evaluation}>
                <Text style={styles.textEvaluation}>Avaliação  <Icon name="star" color={'#e7a74e'} size={15} />
                  <Icon name="star" color={'#e7a74e'} size={15} />
                  <Icon name="star-half-o" color={'#e7a74e'} size={15} />
                  <Icon name="star-o" color={'#e7a74e'} size={15} />
                  <Icon name="star-o" color={'#e7a74e'} size={15} />
                </Text>
              </View> */}

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
          services={this.state.services}
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
    // padding: '2%',
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
    marginBottom: 10,
  },
  city: {
    flex: 1,
    //  flex: 1,
    marginTop: 0,
    marginLeft: 0,
  },
  footer: {
    flex: 1,
    //    flex: 1,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    flex: 2,
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
  buttonServices: {
    flex: 1,
    //left: Dimensions.get('window').width / 2 + 40,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    borderRadius: 3,
    //width: 90,
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