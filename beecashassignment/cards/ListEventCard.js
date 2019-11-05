import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Platform,
  StatusBar,
  ImageBackground,
  PermissionsAndroid,
  //   Share
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListEventScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <ImageBackground
          source={this.props.EventThumbnail}
          style={{
            width: '100%',
            height: 200,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.75)',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text style={{color: '#ffffff', fontSize: 20}}>
                {this.props.EventName}
              </Text>
              <Text style={{color: '#ffffff', fontSize: 15}}>
                {this.props.Location}
              </Text>
              <Text style={{color: '#ffffff', fontSize: 10}}>
                {this.props.EntryFee}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 100,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#80ffff',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});
