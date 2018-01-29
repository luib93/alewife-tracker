import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TrainSchedule extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.props.trainName}</Text>
                <View style={styles.body}>
                    <Text style={styles.times}>{this.props.time}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
