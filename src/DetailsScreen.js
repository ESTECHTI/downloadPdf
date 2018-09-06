import React, { Component } from 'react';
import { Text, View, Button, FlatList, Dimensions, StyleSheet, Platform, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import Expo from 'expo';
import { expo } from '../app.json';
import flatListData from '../src/components/flatListData';
import Swipeout from 'react-native-swipeout';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

const isSmallDevice = SCREEN_WIDTH <= 414;

const numColumns = isSmallDevice ? 1 : 2;

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

const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;


class FlatListItem extends Component {

  allow(orientation) {
    const key = orientation === 'portrait' ? expo.orientation : orientation;
    Expo.ScreenOrientation.allow(ORIENTATIONS[key] || ORIENTATION_DEFAULT);
  }

  constructor(props) {
    super(props);

   this.state = {
     loading: false,
     data: [],
     page: 1,
     seed: 1,
     error: null,
     refreshing: false,

     activeRowKey: null
   }
  }

  componentWillMount() {
    this.allow(this.props.allow);

  }

  componentWillUnmount() {

    this.allow('default');
  }

  render() {
    return this.props.children;
  }

render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if(this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null })
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {    
            const deletingRow = this.state.activeRowKey;          
            Alert.alert(
                'Alert',
                'Are you sure you want to delete ?',
                [                              
                  {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Yes', onPress: () => {        
                    flatListData.splice(this.props.index, 1); 
                    //Refresh FlatList ! 
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  }},
                ],
                { cancelable: true }
              ); 
        }, 
        text: 'Delete', type: 'delete' 
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    }
    return (
      <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',                                
                }}>            
                    <View style={{
                            flex: 1,
                            flexDirection:'row',
                            // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
                            backgroundColor: 'mediumseagreen'
                    }}>            
                        <Image 
                            source={{uri: this.props.item.imageUrl}}
                            style={{width: 100, height: 100, margin: 5}}
                        >

                        </Image>
                        <View style={{
                                flex: 1,
                                flexDirection:'column',   
                                height: 100                 
                            }}>            
                                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                                <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                        </View>              
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'white'                            
                    }}>
                
                    </View>
                </View>   
            </Swipeout>      
      
    )
  }
}

ScreenOrientation.propTypes = {
  children: PropTypes.node,
  allow: PropTypes.oneOf(Object.keys(ORIENTATIONS))
}

const styles = StyleSheet.create({
  
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,  
}
});

export default class BasicFlatList extends Component {
  constructor(props) {
      super(props);     
      this.state = ({
          deletedRowKey: null,            
      });
  }
  refreshFlatList = (deletedKey) => {
      this.setState((prevState) => {
          return {
              deletedRowKey: deletedKey
          };
      });
  }
  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
          <FlatList 
              data={flatListData}
              renderItem={({item, index})=>{
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                  <FlatListItem item={item} index={index} parentFlatList={this}>

                  </FlatListItem>);
              }}
              >

          </FlatList>
      </View>
    );
  }
}


