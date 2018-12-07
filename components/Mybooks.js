import React from 'react';
import { StyleSheet, Text, View, Platform, ListView } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right,
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator, Input, Item, Form, Picker } from 'native-base';
import { Font, AppLoading } from "expo";
import MybooksBody from './MybooksBody';
import firebase from './Firebase';

var searchTitles = [];
var searchAuthors = [];
var searchPrices = [];

class Mybooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selected1: undefined,
      selected2: undefined,
      textbookSearch: "",
      onCall: true,
      // info: {},
      // searchMatches: ["book 1", "book 2"],
    };
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

  // extra function needed to import header from native-base
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
    this.searchTextbook();
  }

  searchTextbook = () =>{
    var self = this;
    searchTitles = [];
    searchAuthors = [];
    searchPrices = [];

    if (self.state.textbookSearch == "") {

      this.setState({onCall: true});
      var match = false;

      var firebaseRef = firebase.database().ref();
      var listingsRef = firebaseRef.child("/listings");
      
      listingsRef.on('child_added', function(snapshot) {
        var title = snapshot.val().title;
        var author = snapshot.val().author;
        var search = self.state.textbookSearch.toLowerCase();
        var id = snapshot.key;

        // check if any books match search criteria
        console.log("test");
        console.log(firebase.auth().currentUser.uid);

        if (snapshot.val().uid == firebase.auth().currentUser.uid) {
          searchTitles.push(snapshot.val().title);
          searchAuthors.push(snapshot.val().author);
          searchPrices.push(snapshot.val().price);
        }
        self.setState({onCall: false});
      });
    }
  }

  renderBody = ()=>{
    if(this.state.onCall){
      return(
        <Body style={{flex: 1, paddingTop: '5%'}}>
          <Text style={{alignItems: 'center', fontWeight: 'bold', fontSize: 16}}>Loading</Text>
        </Body>
      )
    }
    else{
      return(
        <MybooksBody searchTitles={searchTitles} searchAuthors={searchAuthors} searchPrices={searchPrices} />
      )
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
          <Title style={{alignSelf: 'center'}}>My Books</Title>
        </Body>
        </Header>

  <View style ={{flex:1, paddingTop: '5%'}}>
          {this.renderBody()}
          </View>

        <Footer>
          <FooterTab>
            <Button vertical active
              onPress={() => this.props.switchScreen("account")}
              ><Icon name="ios-person" />
              <Text style={{color: 'black'}}>Account</Text>
            </Button>
            <Button vertical 
              onPress={() => this.props.switchScreen("search")}
              ><Icon name="ios-search" />
              <Text style={{color: 'black'}}>Search Books</Text>
            </Button>
            <Button vertical
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
  accountText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: '5%'
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

export default Mybooks;
