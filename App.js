import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Container, Header, Content, Form, Item, Input } from 'native-base';
import Login from './components/Login';
import Account from './components/Account';

export default class App extends React.Component {
  
  state = {
    currentScreen: "login"
  }

  switchScreen = (screen) => {
    this.setState({currentScreen: screen});
  }

  renderScreen = () => {
    if (this.state.currentScreen === "login") {
      return (
        <Login switchScreen = {this.switchScreen} />
      );
    }
    else if (this.state.currentScreen === "account") {
      return (
        <Account switchScreen = {this.switchScreen}/>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScreen()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  }
}
