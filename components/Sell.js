import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right,
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator, Input, Item, Form, Picker } from 'native-base';
import { Font, AppLoading } from "expo";
import firebase from './Firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';

// ignore specific warning (caused by expo bug)
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class Sell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      subject: undefined,
      condition: undefined,
      title: "",
      author: "",
      isbn: "",
      price: "",
      city: "",
    };
  }

  // extra needed to import header from native-base
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  // function for subject picker
  onValueChange(value: string) {
    this.setState({
      subject: value
    });
  }

  // function for condition picker
  onValueChange2(value: string) {
    this.setState({
      condition: value
    });
  }

  postTextbook() {
    var firebaseRef = firebase.database().ref();
    var listingsRef = firebaseRef.child("listings");
    if (this.state.subject != undefined
      && this.state.condition != undefined
      && this.state.title != ""
      && this.state.author != ""
      && this.state.isbn != ""
      && this.state.price != ""
      && this.state.city != "") {
      listingsRef.push({
        title: this.state.title.toLowerCase(),
        author: this.state.author.toLowerCase(),
        isbn: this.state.isbn,
        price: this.state.price,
        subject: this.state.subject,
        condition: this.state.condition,
        city: this.state.city,
        uid: this.props.userId,
        userEmail: this.props.userEmail,
      });
      alert("your textbook has been posted");
    }
    else {
      alert("please fill out all of the fields")
    }
  }

  render() {
    // wait until fonts finish loading
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    // main return
    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Body>
            <Title style={{alignSelf: 'center'}}>Sell Textbooks</Title>
          </Body>
        </Header>

        <Content style={styles.bodyContent}>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Condition"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.subject}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="<Select Subject>" value="" />
                <Picker.Item label="Biology" value="biology" />
                <Picker.Item label="Computer Science" value="computer science" />
                <Picker.Item label="Math" value="math" />
                <Picker.Item label="Psychology" value="psychology" />
              </Picker>
            </Item>
          </Form>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Condition"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.condition}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="<Select Conditoin>" value="" />
                <Picker.Item label="Used - Poor" value="used - poor" />
                <Picker.Item label="Used - Good" value="used - good" />
                <Picker.Item label="New" value="new" />
              </Picker>
            </Item>
          </Form>
          <Item regular>
            <Input
              placeholder='Title'
              onChangeText={(title) => this.setState({title})}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='Author'
              onChangeText={(author) => this.setState({author})}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='ISBN'
              onChangeText={(isbn) => this.setState({isbn})}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='Asking Price'
              keyboardType='numeric'
              onChangeText={(price) => this.setState({price})}
              />
          </Item>
          <Item regular>
            <Input
              placeholder='Your City'
              onChangeText={(city) => this.setState({city})}
            />
          </Item>
        </Content>

        <View style={styles.bodyContainerLower}>
          <Button rounded
            style={styles.buttonStyle}
            onPress={() => this.postTextbook(this.state.title, this.state.author, this.state.isbn, this.state.price)}
            ><Text style={styles.buttonText}>Post Textbook</Text>
          </Button>
        </View>

        <Footer>
          <FooterTab>
            <Button vertical
              onPress={() => this.props.switchScreen("account")}
              ><Icon name="ios-person" />
              <Text style={{color: 'black'}}>Account</Text>
            </Button>
            <Button vertical
              onPress={() => this.props.switchScreen("search")}
              ><Icon name="ios-search" />
              <Text style={{color: 'black'}}>Search Books</Text>
            </Button>
            <Button vertical active
              onPress={() => this.props.switchScreen("sell")}
              ><Icon active name="book" />
              <Text style={{color: 'black'}}>Sell Book</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  headerStyle: {
    marginTop: Platform.OS === "android" ? 24 : 0,
  },
  bodyContent: {
    flex: 1,
  },
  bodyContainerLower: {
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
  buttonStyle: {
    width: '40%',
    marginLeft: '30%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
};

export default Sell;
