import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Next 🚉 to Alewife</Text>
        <Text style={styles.author}>by Brian Lui</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  author: {
    textAlign: 'center',
    fontSize: 12,
  },
  header: {
    marginTop: 40,
    flex: 1,
  },
});
