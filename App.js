import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Container, Header, Content, Form, Item, Input } from 'native-base';
import Login from './components/Login';
import Account from './components/Account';
import Search from './components/Search';
import Sell from './components/Sell';
import firebase from './components/Firebase';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      currentScreen: "login",
    };
  }

   // When the App component mounts, we listen for any authentication
   // state changes in Firebase.
   // Once subscribed, the 'user' parameter will either be null 
   // (logged out) or an Object (logged in)
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  // stop listening for authentication state changes when component unmounts
  componentWillUnmount() {
    this.authSubscription();
  }

  switchScreen = (screen) => {
    this.setState({currentScreen: screen});
    // console.log(this.state.user);
  }

  // switch screen and verify that the user is logged in
  renderScreen = () => {
    if (this.state.loading) {
      return null;
    }
    else if (this.state.currentScreen === "login") {
      return (
        <Login switchScreen = {this.switchScreen} />
      );
    }
    else if (this.state.currentScreen === "account" && this.state.user) {
      return (
        <Account switchScreen = {this.switchScreen} userEmail = {this.state.user.email} />
      );
    }
    else if (this.state.currentScreen === "search" && this.state.user) {
      return (
        <Search switchScreen = {this.switchScreen} />
      );
    }
    else if (this.state.currentScreen === "sell" && this.state.user) {
      return (
        <Sell 
          switchScreen = {this.switchScreen}
          userEmail = {this.state.user.email}
          userId = {this.state.user.uid}
        />
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
