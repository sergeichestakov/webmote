import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  Keyboard,
  View,
} from 'react-native';
import React from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

const buttonSize = 50;
const URL = "ws://10.19.188.100:8000"
const ws = new WebSocket(URL);

export default class HomeScreen extends React.Component {

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
              onSubmitEditing={() => this.sendResult(search)}
          />
        </View>
            <View style={styles.buttonContainer}>
              <View style={styles.circle}>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{paddingTop: 20, margin: 20}} onPress={() => this.sendMessage("power")}>
                    <Icon name='poweroff' color='crimson' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingTop: 15, margin: 20}} onPress={() => this.sendMessage("refresh")}>
                    <Icon name='refresh' color='silver' size={buttonSize} type='material'/> 
                  </TouchableOpacity>
                </View>

				<View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{paddingTop: 10, margin: 15}} onPress={() => this.sendMessage("history", "back")}>
                    <Icon name='stepbackward' color='black' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingTop: 10, margin: 15}} onPress={() => this.sendMessage("history", "forward")}>
                    <Icon name='stepforward' color='black' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                </View>

                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{paddingTop: 10, margin: 7}} onPress={() => this.sendMessage("link", "down")}>
                    <Icon name='caretdown' color='black' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingTop: 10, margin: 7}} onPress={() => this.sendMessage("link", "up")}>
                    <Icon name='caretup' color='black' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingTop: 10, margin: 7}} onPress={() => this.sendMessage("link", "enter")}>
                    <Icon name="enter" color='black' size={buttonSize / 1.35} type='antdesign'/> 
                  </TouchableOpacity>
                </View>

                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.sendMessage("direction", "up")}>
                    <Icon name='upcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.sendMessage("direction", "left")}>
                    <Icon name='leftcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.sendMessage("direction", "right")}>
                    <Icon name='rightcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                <View style={styles.arrowRow}>
                  <TouchableOpacity style={styles.arrow} onPress={() => this.sendMessage("direction", "down")}>
                    <Icon name='downcircle' size={buttonSize} type='antdesign'/> 
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </View>
      </View>
    );
  }


  sendMessage(type, message) {
    console.log(type, message);
    Vibration.vibrate(20);
    if(message === undefined) message = null
    const object = {type: type, message: message};
    ws.send(JSON.stringify(object));
  }

  updateSearch(search) {
    this.setState({ search });
  };

  sendResult(search) {
    this.setState({ search: "" });
    Keyboard.dismiss();
    this.sendMessage("search", search);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#e6e8ed',
  },
  searchBar: {
    flex:8.5
  },
  searchButton: {
    flex:1.5,
  },
  searchContainer: {
    flex:1.25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    flex:9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 225,
    height: 400,
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
