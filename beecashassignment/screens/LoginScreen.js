import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
    };
  }

  async componentDidMount() {
    try {
      let UserName = await AsyncStorage.getItem('UserName');
      if (UserName != null) {
        this.props.navigation.replace('AllEvents');
      }
    } catch (cause) {
      console.log(cause);
    }
  }

  async setUserName() {
    try {
      await AsyncStorage.setItem('UserName', this.state.UserName.trim());
      this.props.navigation.replace('AllEvents');
    } catch (cause) {
      console.log(cause);
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#003366',
          flex: 1,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 35,
            paddingTop: 200,
            paddingBottom: 50,
            color: '#ffffff',
          }}>
          Login
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#ffffff"
          style={{textDecorationColor: '#ffffff', color: '#ffffff'}}
          onChangeText={UserName => {
            this.setState({UserName});
          }}
        />
        <Button
          title="Login"
          onPress={() => {
            this.setUserName();
          }}></Button>
      </View>
    );
  }
}
