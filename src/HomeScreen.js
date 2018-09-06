import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import Expo from 'expo';
import { expo } from '../app.json';

import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Drawer, Container, Header, Content,Button } from 'native-base';

const { width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const isSmallDevice = SCREEN_WIDTH <= 414;

const ORIENTATION_DEFAULT = 
isSmallDevice 
? 
Expo.ScreenOrientation.Orientation.PORTRAIT
:
Expo.ScreenOrientation.Orientation.LANDSCAPE;

const ORIENTATIONS = {
  'portrait': Expo.ScreenOrientation.Orientation.PORTRAIT,
  'landscape': Expo.ScreenOrientation.Orientation.LANDSCAPE,
  'default': ORIENTATION_DEFAULT,
};


class SideBar extends React.Component {

  static navigationOptions = {
    header: null,
    headerMode: 'screen'
  }


  allow(orientation) {
    const key = orientation === 'portrait' ? expo.orientation : orientation;
    Expo.ScreenOrientation.allow(ORIENTATIONS[key] || ORIENTATION_DEFAULT);
  }

  componentDidMount() {
    this.allow(this.props.allow);
  }

  componentWillUnmount() {

    this.allow('default');
  }

  render() {
    return this.props.children;
  }

    static navigationOptions = { header: null } 

  render() {

    return (
      isSmallDevice
      ?
      <View style={{ backgroundColor: '#fff', flex: 1}}
      >

         <View style={{ borderWidth: 0.5, height: 1, borderColor: '#d82222', marginTop: '30%', marginLeft: 10, marginRight: 10}} />
          
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '10%', marginLeft: '10%' }}>
            <Icon name='edit' size={40} color= '#d82222' />
            <TouchableOpacity
              onPress={() => this.navigation.navigate('Details')}
            >
            <Text style={{ color: '#d82222', fontSize: 20 }}
            >
                    Details
            </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '2%', marginLeft: '10%' }}>
            <Icon name='poll' size={40} color= '#d82222' />
            <Text style={{ color: '#d82222', fontSize: 20 }}>
                    Dashboard
            </Text>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '2%', marginLeft: '10%' }}>
            <Icon name='person' size={40} color= '#d82222' />
            <Text style={{ color: '#d82222', fontSize: 20 }}>
                    Text Input
            </Text>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '2%', marginLeft: '10%' }}>
            <Icon name='check' size={40} color= '#d82222' />
            <Text style={{ color: '#d82222', fontSize: 20 }}>
                    AppPage2
            </Text>
          </View>
          

      </View>
      :
      <View style={{ backgroundColor: '#d82222', flex: 1, alignItems: 'center', justifyContent: 'center', width: '65%'}}>
           <Text style={{ color: '#d82222', fontSize: 30, paddingTop: 30, paddingLeft: 30 }}>
                  X
          </Text>
          <Text style={{ color: '#d82222', fontSize: 30 }}>
                  Conteúdo side bar
          </Text>
      </View>
      
    );
  }
} 

export default class HomeScreen extends Component {

  static navigationOptions = { header: null } 


closeDrawer = () => {
    this.drawer._root.close()
};
openDrawer = () => {
    this.drawer._root.open()
};    
render() {
  return (
    
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar navigator={this.navigator} />}
      onClose={() => this.closeDrawer()}
      
      >
      
      
          <Container style={{flexDirection: 'row', padding: 30, marginTop: '10%'}}>
                  <Icon onPress={() => this.openDrawer()} name="reorder" size={50} color="#d82222" />
          </Container>
      

      <View style={{
        flex: 1, position: 'absolute', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', marginTop: '70%', marginLeft: '13%'
      }}>

      <View style={{ flexDirection: 'row', marginBottom: 1 }}>
        <View style={[styles.menu, { marginRight: 1, alignItems :'center', justifyContent: 'center'}]}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Details')}
            underlayColor='transparent'
          >

            <Icon name='edit' size={80} color= '#d82222' />
          </TouchableHighlight>

          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Details</Text>
        </View>

        <View style={[styles.menu, { marginLeft: 2, alignItems: 'center', justifyContent: 'center'}]}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Dashboard')}
            underlayColor='transparent'
          >
            <Icon name='poll' size={80} color= '#d82222' />
          </TouchableHighlight>
          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Dashboard</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 2, }}>
        <View style={[styles.menu, { marginRight: 1, alignItems: 'center', justifyContent: 'center'}]}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('AppPage')}
          underlayColor='transparent'
        >
          <Icon name='person' size={80} color= '#d82222' />
        </TouchableHighlight>
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Text Input</Text>
      </View>

        <View style={[styles.menu, { marginLeft: 2, alignItems: 'center', justifyContent: 'center'}]}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('AppPage2')}
            underlayColor='transparent'
          >
            <Icon name='check' size={80} color= '#d82222' />
          </TouchableHighlight>
          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>AppPage2</Text>
        </View>
      </View>
    </View>
      </Drawer>
  );
  }
}


ScreenOrientation.propTypes = {
  children: PropTypes.node,
  allow: PropTypes.oneOf(Object.keys(ORIENTATIONS))
}

const styles = StyleSheet.create({
  menu: {
    borderWidth: 1, 
    borderColor: '#ff0000', 
    width: 130, 
    height: 130 
  }
})

