import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card} from 'react-native-elements';
import GeolocationExample from './Geolocation';
import data from './Event.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  eventAlert = (insideOrNah) => {
      if (insideOrNah)
      {


        return <Card containerStyle={{padding: 0}}>
        <View style={{backgroundColor: '#b2b2ff', padding: 10, alignItems: 'center'}}>
          <Text style={{color: 'white'}}> {data.name} </Text>
        </View>
        <Text>
        Time: {data.time} {"\n"}
        Date: {data.date} {"\n"}   
        Address: {data.address}
        </Text>
      </Card>

     
      }

      else 
      {
        return <Text> No Events Nearby </Text>
      }
  }

  render() {
    return (
      <View style={styles.container}> 
        <GeolocationExample eventAlert={this.eventAlert} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
