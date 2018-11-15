import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Container, Header, Content, Form, Item, Input } from 'native-base';
import Login from './components/Login';
import Account from './components/Account';
import Search from './components/Search';
import Sell from './components/Sell';

export default class App extends React.Component {
  
  state = {
    currentScreen: "sell"
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
        <Account switchScreen = {this.switchScreen} />
      );
    }
    else if (this.state.currentScreen === "search") {
      return (
        <Search switchScreen = {this.switchScreen} />
      );
    }
    else if (this.state.currentScreen === "sell") {
      return (
        <Sell switchScreen = {this.switchScreen} />
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
