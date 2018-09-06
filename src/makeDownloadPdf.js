import React, { Component } from 'react';
import { View, Dimensions, Button, Share, Alert } from 'react-native';
import { Constants, FileSystem } from 'expo';
import PDFReader from 'rn-pdf-reader-js';

export default class App extends Component {

  state = {
    source: null
  }
  
  static navigationOptions = {
    title: 'Pdf Screen',
  };

  componentDidMount(){
    
  }

   makeDowload() {
     FileSystem.downloadAsync(
      'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
      FileSystem.documentDirectory + 'myDirectory/../components/downloads'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        Alert.alert('Finished downloading to ', uri);
      })
      .catch(error => {
        console.error(error);
      });

  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}
      >
        <PDFReader
          source={{ uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf" }}
        />
      
        <Button          
          title="baixar"
          onPress={() => {
            this.makeDowload();
          }}/>
      </View>
    );
  }
}
