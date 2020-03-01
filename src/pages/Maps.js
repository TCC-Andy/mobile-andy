import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ModalExemplo from '../componentes/ModalExemplo'

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
        key={place.id}
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
          centerCoordinate={[ -49.19572592,-25.4554812]}
          zoomLevel={12}
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