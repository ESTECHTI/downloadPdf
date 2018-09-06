import React, {Component} from 'react';
import { Button, View, StyleSheet, Text, TextInput, AsyncStorage, Keyboard} from 'react-native';

export default class AppPage extends Component {

    constructor(props){
        super(props);

        this.state={
            fname:'',
            lname: '',
        }
    }

    saveData =()=>{
        const {fname, lname} = this.state;

        // save data with AsyncStorage

        let myArray={
            fname: fname,
            lname: lname
        }

        AsyncStorage.setItem('myArray', JSON.stringify(myArray))

        Keyboard.dismiss();
        alert(fname + ' ' + lname + 'your data saved successfully');
    }

    showData = async()=>{
        let myArray = await AsyncStorage.getItem('myArray');
        let d = JSON.parse(myArray);
        alert(d.fname + ' ' + d.lname);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Hello
                </Text>

                <TextInput
                    placeholder="First name"
                    style={styles.input}
                    onChangeText={fname => this.setState({fname})}
                />

                <TextInput 
                    placeholder='Last name'
                    style={styles.input}
                    onChangeText={lname => this.setState({lname})}
                />

                <Button 
                    title="Save Data"
                    onPress={this.saveData}
                    color="green"
                />

                <Button 
                    color="magenta"
                    onPress={this.showData}
                    title="Show my data"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    }
})