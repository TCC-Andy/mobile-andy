import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert,Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo'

MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
    showModal: false,
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    places: [
      {
        id: '1',
        title: 'Casa do Bruno',
        description: 'Proximo a BR 277...',
        latitude: -25.45575244,
        longitude: -49.22044516,
      },
      {
        id: '2',
        title: 'casa do Thiago',
        description: 'Localizado proximo a Fapi',
        latitude: -25.45245873,
        longitude: -49.18684244,
      },
      {
        id: '3',
        title: 'Faculdade de Pinhais',
        description: 'Um local bem localizado em Pinhais',
        latitude: -25.44435969,
        longitude: -49.18858051,
      }
    ]
  }
  renderAnnotations2(place) {
    return (
      <MapboxGL.PointAnnotation
        ref={p => (this.place = p)}
        id={place.id}
        coordinate={[place.longitude, place.latitude]}
        onSelected={() =>Alert.alert(place.id)}
      //onDeselected // para esconder modal
      >
        <View style={styles.annotationFill} >
          <Text>{place.id}</Text>
        </View>
        <MapboxGL.Callout title={place.description} />
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
        styleURL={MapboxGL.StyleURL.Dark}// stret/ satellite
        attributionPosition={{ top: 8, left: 8 }}  //canto superior esquerda
        logoEnabled={false} // tirar o logo do mapa
      >
           <ModalExemplo isVisible={this.state.showModal} />

        <MapboxGL.Camera
          centerCoordinate={[-49.19572592, -25.4554812]}
          zoomLevel={12}
          pitch={5}
          heading={5}
          animationMode='flyTo'
          animationDuration={3000}
        >
        </MapboxGL.Camera>
        <MapboxGL.UserLocation
          animated={true}
          visible={true}
            />

        {this.state.places.map(place => this.renderAnnotations2(place))}
        {/*this.renderAnnotations()*/}
      </MapboxGL.MapView>
      <View style={styles.markerAnotacion}> 
        <Text>aqui vai info</Text>
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
    flex: 1,
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
    width: 40,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#00FF00',
    transform: [{ scale: 0.8 }],
  }
});



/*<TouchableOpacity style={[
                    styles.addButton,
                    {
                        backgroundColor: this.getColor()
                    }]}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTask: true })}>
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secondary} />
                </TouchableOpacity>
visible */

/*
 renderAnnotations() {
    return (
      <MapboxGL.PointAnnotation
        id='rocketseat'
        coordinate={[-49.6446024, -27.2108001]}
      >
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <MapboxGL.Callout title='House' />
      </MapboxGL.PointAnnotation>
    )
  }
*/