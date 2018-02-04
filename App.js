import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert, AppState } from 'react-native';
import Header from './Header';
import TrainSchedule from './TrainSchedule';
import StationText from './StationText';
import * as Request from './request';
import StationSelector from './StationSelector';

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
      showSelector: false,
      stationName: 'JFK / UMASS',
    };
  }

  componentDidMount() {
    this.refreshAPI();

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.refreshAPIControl();
    }
  };

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

  handleStationTextPress = () => {
    this.setState({
      showSelector: true,
    });
  }

  handleSelectorChange = (itemValue) => {
    this.setState({
      stationName: itemValue,
      showSelector: false,
    });
  }

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
          <StationText stationName={this.state.stationName} onPress={this.handleStationTextPress} />
          <TrainSchedule trainName="From Ashmont" time={this.state[ASHMONT]} />
          <TrainSchedule trainName="From Braintree" time={this.state[BRAINTREE]} />
        </ScrollView>
        {this.state.showSelector && <StationSelector onValueChange={this.handleSelectorChange} /> }
      </View>
    );
  }
}
