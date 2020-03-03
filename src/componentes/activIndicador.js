import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class activIndicador extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator animating={this.props.animating} size="large" color="#0000ff" />
        <ActivityIndicator animating={this.props.animating}  size="small" color="#00ff00" />
        <ActivityIndicator animating={this.props.animating}  size="large" color="#0000ff" />
        <ActivityIndicator animating={this.props.animating}  size="small" color="#00ff00" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
