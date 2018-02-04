import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import * as Request from './request';

const ASHMONT = 'ashmontTime';
const BRAINTREE = 'braintreeTime';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexGrow: 1 / 8,
    minHeight: 30,
  },
  body: {
    flexGrow: 7 / 8,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [ASHMONT]: null,
      [BRAINTREE]: null,
      refreshing: false,
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

  handleAPIError = (key) => {
    console.log(`Update ${key} error`);
  }

  refreshAPI = () => {
    this.setState({ refreshing: true });

    return Promise.all([
      Request.getNextAshmontTime(),
      Request.getNextBraintreeTime(),
    ]).then(([ashmontData, braintreeData]) => {
      this.updateTime(ASHMONT, ashmontData[0]);
      this.updateTime(BRAINTREE, braintreeData[0]);
      this.setState({ refreshing: false });
    }).catch(this.handleAPIError);
  }

  refreshAPIControl = () => this.refreshAPI().then(() => {
    Alert.alert('Updated');
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>
        <ScrollView
          style={styles.body}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshAPIControl}
            />
          }
        >
          <StationText stationName="JFK / UMASS" />
          <TrainSchedule trainName="From Ashmont" time={this.state[ASHMONT]} />
          <TrainSchedule trainName="From Braintree" time={this.state[BRAINTREE]} />
        </ScrollView>
      </View>
    );
  }
}
