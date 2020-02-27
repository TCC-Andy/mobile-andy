import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from './componentes/ModalExemplo'

MapboxGL.setAccessToken("pk.eyJ1IjoiYnJ1bm9wZWRyb3NvIiwiYSI6ImNrNmJkY2R3dDEwODkzbW1yZmFvcHA2dzIifQ.0cwlHJwaGJpu9ZGfdyhkuQ");

export default class Maps extends Component {
  state = {
    showAddTask: false,
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
        title: 'Casa do café',
        description: 'Café quentinho...',
        latitude: -27.2106710,
        longitude: -49.6362700,
      },
      {
        id: '2',
        title: 'RocketSeat',
        description: 'Programação, empreendedorismo e mindset',
        latitude: -27.2006710,
        longitude: -49.6362700,
      },
      {
        id: '3',
        title: 'Casa do José',
        description: 'José, tá em casa?',
        latitude: -25.3529186,
        longitude: -49.9694866,
      }
    ]
  }
  renderAnnotations2(place) {
    return (
      <MapboxGL.PointAnnotation
        ref={p => (this.place = p)}
        id={place.id}
        coordinate={[place.longitude, place.latitude]}
      //onSelected // usar para mostra modal
      //onDeselected // para esconder modal
      >
        <TouchableOpacity style={styles.annotationContainer} 
        onPress={()=>this.setState.showAddTask=true}>
           <ModalExemplo isVisible={this.state.showAddTask} />
          <View style={styles.annotationFill} />
        </TouchableOpacity>
        <MapboxGL.Callout title={place.description} />
      </MapboxGL.PointAnnotation>
    )
  }
/**-25.5592036,-49.7625784,9.1 */
  render() {
    return (
      <MapboxGL.MapView
        ref={m => (this.map = m)}
        style={styles.container}
        showUserLocation={true}
        styleURL={MapboxGL.StyleURL.Dark}// stret/ satellite
        attributionPosition={{ top: 8, left: 8 }}  //canto superior esquerda
        logoEnabled={false} // tirar o logo do mapa

      >
        
        <MapboxGL.Camera
          centerCoordinate={[ -50.1934481,-26.8648851]}
          zoomLevel={5}
          pitch={5}
          heading={5}
          animationMode='flyTo'
          animationDuration={3000}
        > 
        </MapboxGL.Camera>
        <MapboxGL.UserLocation
        animated
        visible={true}>

        </MapboxGL.UserLocation>
        {this.state.places.map(place => this.renderAnnotations2(place))}
          {/*this.renderAnnotations()*/}
      </MapboxGL.MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00FF00',
    transform: [{ scale: 0.8 }], 
  }
});


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