import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import App from './App';

class GeolocationExample extends Component {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      inside: []
    };
  }

  componentDidMount() {
    this.watchId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  insidePolygon(point, poly) {
    //Based on ray casting algorithm, which says draw a ray from a point. If the ray intersects an even number of sides, 
    //then the point is outside. Otherwise, inside. 
    let x = point[0],
      y = point[1];

    let inside = [];
    //loop over each polygon
    for (let k = 0; k < poly.length; k++) {
      //initialize inside value for each polygon
      inside.push(false);
      //loop over each side of polygon
      for (let i = 0, j = poly[k].length - 1; i < poly[k].length; j = i++) {
        let xi = poly[k][i][0],
          yi = poly[k][i][1];
        let xj = poly[k][j][0],
          yj = poly[k][j][1];
        //determine if ray intersects the side in question
        let intersect =
          (yi > y != yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside[k] = !inside[k];
      }
    }

    return inside;
  }

  tick() {
    //TEST VALUES, This will be replaced by the JSON file after more testing options available
    //Home
    const polygon = [
        [38.0357787654258, -84.47840881114922],
        [38.03629000750505, -84.47747003799401],
        [38.035816791819, -84.476928231773],
        [38.035297096069726, -84.4775947607132]
    ];
    //Front parking lot
    const polygon2 = [
      [39.14999451638141, -84.24375019377896],
      [39.149844753209926, -84.24437246627042],
      [39.150772447728265, -84.24365899867246],
      [39.15059356588043, -84.24324057406614]
    ];
    //Desk and building
    const polygon3 = [
      [39.14978235179437, -84.24389503306577],
      [39.149786511890454, -84.24458704299161],
      [39.14914793426259, -84.24460850066373],
      [39.14915001432939, -84.24386284655759]
    ];
    //polygonList is an array of polygons which are arrays of coordinates which is an array of latitude and longitude
    const polygonList = [polygon, polygon2, polygon3];

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        let currentPoint = [
          position.coords.latitude,
          position.coords.longitude
        ];

        this.setState({
          inside: this.insidePolygon(currentPoint, polygonList)
        });
      },
      //Error handling
      error => this.setState({ error: error.message }),
      {
        timeout: 600000
      }
    );
  }

  render() {
    return (
      //All of the displays are for testing purposes, remove before merging
      <View style={styles.container}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Inside: {String(this.state.inside)} </Text>

        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        {this.props.eventAlert(this.state.inside[0])}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GeolocationExample