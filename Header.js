import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    flex: 1,
    justifyContent: 'center',
  },
});

const Header = () => (
    <View style={styles.header}>
      <Text style={styles.text}>Next 🚉 to Alewife</Text>
      <Text style={styles.author}>by Brian Lui</Text>
    </View>
);

export default Header;
