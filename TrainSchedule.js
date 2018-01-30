import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TrainSchedule extends React.Component {
    translateTime = () => {
        if(!this.props.time) {
            return 'N/A';
        } else if(isNaN(this.props.time)) {
            return 'End of service';
        }

        const mins = Math.round(this.props.time / 60000);
        const unit = mins === 1 ? 'minute' : 'minutes';
        return `${mins} ${unit}`;
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
    time: PropTypes.number,
};

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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
