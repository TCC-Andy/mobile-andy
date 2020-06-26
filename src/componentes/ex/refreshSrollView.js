import React, { Component } from 'react'
import { ScrollView, RefreshControl,View,Text } from 'react-native';

export default class Horarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    console.log('oiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }



  render() {
    return (

        <View >
        <ScrollView 
                style={{marginTop: 35}}
                refreshControl={console.log('refrrdrdrd'),
                    <RefreshControl 
                        onRefresh={() => this._onRefresh.bind(this)}
                        refreshing={this.state.refreshing}
                    />
                }
            >
                <View>
            <Text>olaaaaa</Text>
        </View>
            </ScrollView>
      </View>
    //   <ScrollView
    //     refreshControl={
    //       <RefreshControl
    //         refreshing={this.state.refreshing}
    //         onRefresh={this._onRefresh}
    //       />
    //     }
    //   />
    // );
    )}

}