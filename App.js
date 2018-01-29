import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import RefreshButton from './RefreshButton';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <StationText stationName="JFK / UMASS" />
          <TrainSchedule trainName="From Ashmont"/>
          <TrainSchedule trainName="From Braintree" />
          <RefreshButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
});
