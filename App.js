import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card} from 'react-native-elements';
import GeolocationExample from './Geolocation';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Matthew",
      newInside: []
    }
  }

  eventAlert = (insideOrNah) => {
      if (insideOrNah)
      {
        return <Card containerStyle={{padding: 0}}>
        <View style={{backgroundColor: '#b2b2ff', padding: 10, alignItems: 'center'}}>
          <Text style={{color: 'white'}}> Full width header </Text>
        </View>
        <Text>
        Puppy Adoption Day {"\n"}
        Time: {"\n"}
        Date: {"\n"}   
        </Text>
      </Card>
      }
      else 
      {
        return <Text> Hello </Text>
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
    justifyContent: 'center',
  },
});
