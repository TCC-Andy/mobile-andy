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
            Termo de uso
                    </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled={true}
        >
          <Text>ANDY é um provedor de serviços on-line, que disponibiliza ferramentas de agendamento e gerenciamento de horários, bem como intermediando os serviços oferecidos por diverso estabelecimentos, operado por meio aplicativos de celular.</Text>
          <Text style={{marginTop:10}}>1. Os serviços objeto do presente Termo e Condições Gerais de Uso do Site consistem em ofertar aos USUÁRIOS CLIENTES espaço virtual, através da PLATAFORMA, destinado a busca de horários disponíveis para agendamento de serviços, ofertados pelos USUÁRIOS PROFISSIONAIS, e permitir o agendamento/reserva de horários.</Text>
          <Text style={{marginTop:10}}> 2. A utilização de quaisquer dos serviços oferecidos implica na mais alta compreensão, aceitação e vinculação do USUÁRIO aos T&C e Política de Privacidade. Ao fazer uso do serviço oferecido, o USUÁRIO concorda em respeitar e seguir todas e quaisquer diretrizes</Text>
          <Text style={{marginTop:10}}>3. O cancelamento dos serviços deverão ser no mínimo com 24 hrs de antecedência pela parte do USUÁRIO CLIENTE.
            Os USUÁRIOS CLIENTES terão acesso a ferramentas de buscas para localizar Empresas, bem como opções de busca horários de atendimento disponíveis na PLATAFORMA, a partir das ofertas dos USUÁRIOS PROFISSIONAIS.
4.Os USUÁRIOS ficam cientes e aceitam, neste Termo de uso de forma expressa, que a ANDY não se responsabiliza:</Text>
            <Text>4.1. Pela reparação de quaisquer danos, de qualquer natureza, de forma direta ou indireta, causados entre os USUÁRIOS, pela veiculação dos serviços prestados e/ou contratados entre os USUÁRIOS.
4.2 Pelos aspectos financeiros das transações e pagamentos realizados entre USUÁRIOS CLIENTES e PROFISSIONAIS.</Text>
            <Text>4.3 Os USUÁRIOS não poderão atribuir à PLATAFORMA nenhuma responsabilidade nem exigir o pagamento por lucros cessantes em virtude de prejuízos resultantes de dificuldades técnicas ou falhas nos sistemas ou na internet. Eventualmente, o sistema poderá não estar disponível por motivos técnicos ou falhas da internet</Text>
          
            <Text style={{marginTop:30,marginBottom:-10, marginLeft:60, color:'black'}}>ANDY - Sistema de Agendamendo</Text>
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
    padding:10
  },
  container: {
        flex: 1,

  },
  scrollView: {
    marginTop:20,
    paddingBottom: 60,
    paddingTop: 10
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
