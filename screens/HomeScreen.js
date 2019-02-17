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
import { Icon, SearchBar } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const buttonSize = 60;
const URL = "ws://10.19.188.100:8000"
const ws = new WebSocket(URL);

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Browser Control',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center'
    },
    headerRight: (<View></View>)
  })

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.sendResult = this.sendResult.bind(this);
  }

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
              placeholder="Search the Internet"
              onChangeText={this.updateSearch}
              platform="default"
              round
              lightTheme
              value={search}
              containerStyle={styles.searchBar}
          />
          <TouchableOpacity style={styles.searchButton} 
                onPress={() => this.sendResult(search)}>
            <Icon name="search" size={30} type='material' />
          </TouchableOpacity>
        </View>
          <View style={styles.buttonContainer}>
              <View style={styles.circle}>
                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.onPress('up')}>
                  <Icon name='upcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.onPress('left')}>
                    <Icon name='leftcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.onPress('right')}>
                    <Icon name='rightcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.onPress('down')}>
                    <Icon name='downcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                  <View style={{flex: 2}}></View>
            </View>
        </View>
      </View>
    );
  }

  onPress(direction) {
    console.log('Pressed ' + direction);
    const object = {type: "direction", message: direction};
    ws.send(JSON.stringify(object));
  };

  updateSearch(search) {
    this.setState({ search });
  };

  sendResult(search) {
    this.setState({ search: "" });

    console.log('Sent ' + search);
    const object = {type: "search", message: search};
    ws.send(JSON.stringify(object));
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  searchBar: {
    flex:8.5
  },
  searchButton: {
    flex:1.5,
  },
  searchContainer: {
    flex:1.25,
    backgroundColor: '#dae2ea',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    flex:9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 200,
    height: 300,
    borderRadius: 80/2,
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowRow: {
    height: 75,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  arrow: {
    margin: 10,
    padding: 10,
  },
});
