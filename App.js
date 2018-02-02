import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import RefreshButton from './RefreshButton';
import * as Request from './request';

const ASHMONT = 'ashmontTime';
const BRAINTREE = 'braintreeTime';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [ASHMONT]: null,
      [BRAINTREE]: null,
    };
  }

  componentDidMount() {
    this.refreshAPI();
  }

  updateTime = (key, data) => {
    this.setState({
      [key]: new Date(data),
    });
  }

  handleAPIError = (key, err) => {
    console.log(`Update ${key} error`);
  }

  refreshAPI = () => {
    return Promise.all([Request.getNextAshmontTime(), Request.getNextBraintreeTime()]).then(([ashmontData, braintreeData]) => {
      this.updateTime(ASHMONT, ashmontData[0]);
      this.updateTime(BRAINTREE, braintreeData[0]);
    }).catch(this.handleAPIError);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <StationText stationName="JFK / UMASS" />
          <TrainSchedule trainName="From Ashmont" time={this.state[ASHMONT]} />
          <TrainSchedule trainName="From Braintree" time={this.state[BRAINTREE]} />
          <RefreshButton onPress={this.refreshAPI} />
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
