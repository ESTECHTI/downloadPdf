import React, { Component } from 'react';
import { Text, View} from 'react-native';

export default class Dashboard extends React.Component {
    
    render(){
        return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Text>Dashboard</Text>
          </View>
        )
    }
}

