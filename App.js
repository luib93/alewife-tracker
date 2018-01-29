import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import RefreshButton from './RefreshButton';
import * as Request from './request';

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

  updateTime = (key, data) => {
    const timeLeft = Math.round(Math.abs(new Date() - new Date(data[0])) / 60000);
    const timeUnit = timeLeft === 1 ? 'minute' : 'minutes';

    if (isNaN(timeLeft)) {
      this.setState({
        [key]: 'End of service',
      });
    } else {
      this.setState({
        [key]: `${timeLeft} ${timeUnit}`,
      });
    }
  }

  updateAshmontArrivalTime = (data) => {
    this.updateTime('ashmontTime', data);
  }

  updateBraintreeArrivalTime = (data) => {
    this.updateTime('braintreeTime', data);
  }

  handleAPIError = (key, err) => {
    this.setState({
      [key]: 'N/A',
    });
  }

  handleAshmontError = (err) => {
    this.handleAPIError('ashmontTime', err);
  }

  handleBraintreeError = (err) => {
    this.handleAPIError('braintreeTime', err);
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
