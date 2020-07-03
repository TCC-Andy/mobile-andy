import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import backgroundImage from '../../../assets/imgs/login15.jpg'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function App() {
  console.log('oioioioio')
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    console.log('opopopopo')
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <ImageBackground source={backgroundImage}
      style={styles.background}>
      <View style={styles.containerPricipal}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>
            Horarios Agendados
                    </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>O uso desse aplicativo..</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  containerPricipal: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    width: '100%',
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,

  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTitle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 40,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    right: 10,
    justifyContent: 'center',
},
  title: {
    fontSize: 25,
    color: '#000000'
},
});
