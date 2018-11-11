import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right, 
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator } from 'native-base';
import { Font, AppLoading } from "expo";

class Account extends React.Component {
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
            <Title style={{alignSelf: 'center'}}>My Account</Title>
          </Body>
        </Header>

        <Content>
          <Separator bordered>
            <Text>Account Information</Text>
          </Separator>
          <ListItem>
            <Text style={styles.accountText}>Username: PLACEHOLDER NAME</Text>
          </ListItem>
          <ListItem last>
            <Text style={styles.accountText}>Email: PLACEHOLDER EMAIL</Text>
          </ListItem>
        </Content>

        <View style={{marginTop: '10%'}}></View>
        
        <View style={styles.bodyContainerUpper}>
          <Button primary style={styles.bigButtonStyle}>
            <Text style={styles.bigButtonText}>My Watchlist</Text>
            <Icon name='ios-arrow-forward' />
          </Button>
          <Button primary style={styles.bigButtonStyle}>
            <Text style={styles.bigButtonText}>My Books For Sale</Text>
            <Icon name='ios-arrow-forward' />
          </Button>
        </View>

        <View style={styles.bodyContainerLower}>
          <Button rounded 
            style={styles.buttonStyle}
            onPress={() => this.props.switchScreen("login")}
            ><Text style={styles.buttonText}>Log Out</Text>
          </Button>
        </View>

        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="ios-person" />
              <Text style={{color: 'white'}}>Account</Text>
            </Button>
            <Button vertical>
              <Icon name="ios-search" />
              <Text style={{color: 'white'}}>Search Books</Text>
            </Button>
            <Button vertical>
              <Icon active name="book" />
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
  accountText: {
    fontSize: 16,
  },
  bodyContainerLower: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
  bodyContainerUpper: {
    flex: 1,
  },
  buttonStyle: {
    width: '40%',
    marginLeft: '30%',
    justifyContent: 'center',
  },
  bigButtonStyle: {
    width: '70%',
    height: '35%',
    marginLeft: '15%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  bigButtonText: {
    fontSize: 16,
    color: 'white',
  }
};

export default Account;
