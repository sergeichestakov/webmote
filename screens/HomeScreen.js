import React from 'react';
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
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <View style={styles.getStartedContainer}>
            
          </View>
        </ScrollView>

          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.recordButton} 
                onPressIn={this.startRecording}
                onPressOut={this.finishRecording}>
              <Text> Record </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  startRecording() {
    console.log('start');
  }
  finishRecording() {
    console.log('end');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 50,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    padding: 10,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#2196F3',
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
