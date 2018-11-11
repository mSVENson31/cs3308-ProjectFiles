import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right, 
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator } from 'native-base';
import { Font, AppLoading } from "expo";

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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

        <Content>
          
        </Content>

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
};

export default Sell;
