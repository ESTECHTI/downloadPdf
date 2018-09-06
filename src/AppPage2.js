import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Constants, FileSystem } from 'expo';
import PDFReader from 'rn-pdf-reader-js';
import CachePdf from './CachePdf';

export default class App extends Component {

  render() {

    return (
      <View style={styles.container}>
        <CachePdf
          uri= "http://gahp.net/wp-content/uploads/2017/09/sample.pdf"
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  pdf: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    width:Dimensions.get('window').width,
  }
});