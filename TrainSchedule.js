import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

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
    fontSize: 30,
  },
  times: {
    textAlign: 'center',
    fontSize: 40,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class TrainSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.time === this.props.time) {
      return;
    }
    this.updateTimeLeft(nextProps.time);
    this.startTimer();
  }

    stopTimer = () => {
      clearInterval(this.updateTimer);
    }

    startTimer = () => {
      this.stopTimer();
      this.updateTimer = setInterval(this.updateTimeLeftThroughProps, 60000);
    }

    updateTimeLeft = (time) => {
      if (time) {
        const calculatedTime = Math.max(Math.round((time - new Date()) / 60000), 0);

        // end of service will not have a date
        if (Number.isNaN(calculatedTime)) {
          this.stopTimer();
          this.setState({
            timeLeft: NaN,
          });
        } else if (calculatedTime <= 0) {
          this.stopTimer();
          this.setState({
            timeLeft: 0,
          });
        } else {
          this.setState({
            timeLeft: calculatedTime,
          });
        }
      }
    }

    updateTimeLeftThroughProps = () => {
      this.updateTimeLeft(this.props.time);
    }

    componentWillUnmount() {
      this.stopTimer();
    }

    translateTime = () => {
      if (this.state.timeLeft === null) {
        return 'N/A';
      } else if (Number.isNaN(this.state.timeLeft)) {
        return 'End of service';
      }

      const unit = this.state.timeLeft === 1 ? 'minute' : 'minutes';
      return `${this.state.timeLeft} ${unit}`;
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>{this.props.trainName}</Text>
          <View style={styles.body}>
            <Text style={styles.times}>{this.translateTime()}</Text>
          </View>
        </View>
      );
    }
}

TrainSchedule.propTypes = {
  trainName: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date),
};
