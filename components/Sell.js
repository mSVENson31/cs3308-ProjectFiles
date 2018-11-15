import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right, 
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator, Input, Item, Form, Picker } from 'native-base';
import { Font, AppLoading } from "expo";

class Sell extends React.Component {
  constructor(props) {
    super(props);
    selected1: undefined;
    selected2: undefined;
    this.state = { loading: true };
  }

  // function for subject picker
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
  
  // function for condition picker
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  
  // extra needed to import header from native-base
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select Condition"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="<Select Subject>" value="key0" />
                <Picker.Item label="Biology" value="key1" />
                <Picker.Item label="Computer Science" value="key2" />
                <Picker.Item label="Math" value="key3" />
                <Picker.Item label="Psychology" value="key4" />
              </Picker>
            </Item>
          </Form>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select Condition"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="<Select Conditoin>" value="key0" />
                <Picker.Item label="Used - Poor" value="key1" />
                <Picker.Item label="Used - Good" value="key1" />
                <Picker.Item label="New" value="key2" />
              </Picker>
            </Item>
          </Form>
          <Item regular>
            <Input placeholder='Title' />
          </Item>
          <Item regular>
            <Input placeholder='Author' />
          </Item>
          <Item regular>
            <Input placeholder='ISBN' />
          </Item>
          <Item regular>
            <Input placeholder='Asking Price' keyboardType='numeric' />
          </Item>
          <Item regular>
            <Input placeholder='Your City' />
          </Item>
        </Content>

        <View style={styles.bodyContainerLower}>
          <Button rounded 
            style={styles.buttonStyle}
            // onPress={() => this.props.switchScreen("login")}
            ><Text style={styles.buttonText}>Post Textbook</Text>
          </Button>
        </View>

        <Footer>
          <FooterTab>
            <Button vertical
              onPress={() => this.props.switchScreen("account")}
              ><Icon name="ios-person" />
              <Text style={{color: 'white'}}>Account</Text>
            </Button>
            <Button vertical
              onPress={() => this.props.switchScreen("search")}
              ><Icon name="ios-search" />
              <Text style={{color: 'white'}}>Search Books</Text>
            </Button>
            <Button vertical active
              onPress={() => this.props.switchScreen("sell")}
              ><Icon active name="book" />
              <Text style={{color: 'white'}}>Sell Book</Text>
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
