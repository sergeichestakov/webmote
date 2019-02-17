import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const buttonSize = 60;
const URL = "ws://10.19.188.100:8000"
const ws = new WebSocket(URL);
ws.onopen = () => {
  ws.send("Opened");
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.onPress('up')}>
              <Icon name='upcircle' style={styles.arrow} size={buttonSize} type='antdesign'/> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPress('left')}>
              <Icon name='leftcircle' style={styles.arrow} size={buttonSize} type='antdesign'/> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPress('right')}>
              <Icon name='rightcircle' style={styles.arrow} size={buttonSize} type='antdesign'/> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPress('down')}>
              <Icon name='downcircle' style={styles.arrow} size={buttonSize} type='antdesign'/> 
            </TouchableOpacity>
        </View>
    );
  }

  onPress(direction) {
    console.log('Pressed ' + direction);
    ws.send(direction);
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  arrow: {
    margin: 10
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
