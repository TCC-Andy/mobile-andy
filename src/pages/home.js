import React, { Component } from 'react'
import { Alert, Button, KeyboardAvoidingView, ImageBackground, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Home extends Component {

    state = {
        search: ''
    }
    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars'
                            size={30} color='black' />
                    </TouchableOpacity>
                    <KeyboardAvoidingView
                        behavior={null}>
                        <View style={styles.viewSearch}>
                            <SearchBar containerStyle={{ backgroundColor: 'white' }}
                                placeholder="Procurar..."
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>

                <View style={styles.corpo}>
                    <View style={styles.row1}>
                        <View style={styles.icon1}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                                <Avatar
                                    size="large" rounded
                                    source={{
                                        uri:
                                            'https://image.freepik.com/vetores-gratis/barbeiro_52422-130.jpg',
                                    }}
                                />
                                <Text style={styles.texto}>Barbearia</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={styles.icon2}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                                <Avatar
                                    size="large" rounded
                                    source={{
                                        uri:
                                            'data:image/jpeg;base64,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',
                                    }}
                                />
                                <Text style={styles.texto}>Salao</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.icon3}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                                <Avatar
                                    size="large" rounded
                                    source={{
                                        uri:
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxEp5I87tLvhzrsy1KRVlumWbla5SOYB2Ah4IDADL3X3qMfQuP',
                                    }}
                                />
                                <Text style={styles.texto}>Mecanico</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.icon4}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                                <Avatar
                                    size="large" rounded
                                    source={{
                                        uri:
                                            'https://media.gettyimages.com/vectors/girl-washing-car-vector-id467678756?s=612x612',
                                    }}
                                />
                                <Text style={styles.texto}>Lava Car</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>


        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    corpo: {
        flex: 1,
    },
    titleBar: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
    },
    texto: {
        fontSize: 18,

    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 40 : 10 // configurancao dependendo da plaforma
    },
    viewSearch: {
        height: 35,
        width: Dimensions.get('window').width - 55,
        justifyContent: 'center',
        right: -10,
        justifyContent: 'center',
    },
    icon1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon3: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon4: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //  marginRight: 10,
    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',

    },


});