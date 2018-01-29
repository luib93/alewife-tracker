import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Request from './request';

export default class TrainSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextArrivalTime: null,
        };
    }

    updateArrivalTime = (data) => {
        const timeLeft = Math.round(Math.abs(new Date() - new Date(data[0])) / 60000);
        const timeUnit = timeLeft === 1 ? 'minute' : 'minutes';

        if (isNaN(timeLeft)) {
            this.setState({
                nextArrivalTime: 'End of service',
            });
        } else {
            this.setState({
                nextArrivalTime: `${timeLeft} ${timeUnit}`,
            });
        }
    }

    handleAPIError = (err) => {
        this.setState({
            nextArrivalTime: 'N/A',
        });
    }

    componentDidMount() {
        let result = null;

        if (this.props.trainName.indexOf('Ashmont') !== -1) {
            result = Request.getNextAshmontTime();
        } else {
            result = Request.getNextBraintreeTime();
        }

        result.then(this.updateArrivalTime).catch(this.handleAPIError);
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.trainName}</Text>
        <View style={styles.body}>
            <Text style={styles.times}>{this.state.nextArrivalTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    height: 20,
    flex: 2,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
      color: 'white',
      borderBottomWidth: 1,
      backgroundColor: 'black',
      paddingLeft: 15,
      fontSize: 30
  },
  times: {
    textAlign: 'center',
    fontSize: 40,
  }, 
  body: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
});
