import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import RefreshButton from './RefreshButton';
import * as Request from './request';

const ASHMONT = 'ashmontTime';
const BRAINTREE = 'braintreeTime';
const TIMER = 'Timer';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ashmontTime: null,
      braintreeTime: null,
    };
  }

  componentDidMount() {
    this.refreshAPI();
  }

  stopTimer = (key) => {
    clearInterval(this[key]);
  }

  startTimer = (key) => {
    this.stopTimer(key);

    // decrement every minute (60,000 MS)
    this[key] = setInterval(()=> {
      this.setState((prev)=> {
        return {
          [key]: Math.max(prev[key] - 60000, 0),
        };
      });

      // stop when we hit 0 minutes
      if (Math.round(this.state[key] / 60000) <= 0) {
        this.stopTimer(key);
      }
    }, 60000);
  }

  updateTime = (key, data) => {
    const timeLeft = Math.round(Math.abs(new Date() - new Date(data[0])));

    this.setState({
      [key]: timeLeft,
    });

    if(timeLeft && !isNaN(timeLeft)) {
      this.startTimer(key);
    }
  }

  componentWillUnmount() {
    this.stopTimer(ASHMONT);
    this.stopTimer(BRAINTREE);
  }

  updateAshmontArrivalTime = (data) => {
    this.updateTime(ASHMONT, data);
  }

  updateBraintreeArrivalTime = (data) => {
    this.updateTime(BRAINTREE, data);
  }

  handleAPIError = (key, err) => {
    this.setState({
      [key]: 'N/A',
    });
  }

  handleAshmontError = (err) => {
    this.handleAPIError(ASHMONT, err);
  }

  handleBraintreeError = (err) => {
    this.handleAPIError(BRAINTREE, err);
  }

  refreshAPI = () => {
    Request.getNextAshmontTime().then(this.updateAshmontArrivalTime).catch(this.handleAshmontError);
    Request.getNextBraintreeTime().then(this.updateBraintreeArrivalTime).catch(this.handleBraintreeError);
  }

  handlePress = () => {
    this.refreshAPI();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <StationText stationName="JFK / UMASS" />
          <TrainSchedule trainName="From Ashmont" time={this.state.ashmontTime} />
          <TrainSchedule trainName="From Braintree" time={this.state.braintreeTime} />
          <RefreshButton onPress={this.handlePress} />
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
