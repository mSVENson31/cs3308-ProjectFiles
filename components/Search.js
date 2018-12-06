import React from 'react';
import { StyleSheet, Text, View, Platform, ListView } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right,
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator, Input, Item, Form, Picker } from 'native-base';
import { Font, AppLoading } from "expo";
import SearchBody from './SearchBody';
import firebase from './Firebase';

var searchTitles = [];
var searchAuthors = [];
var searchPrices = [];

class Search extends React.Component {

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
  }

  searchTextbook = () =>{

    var self = this;
    searchTitles = [];
    searchAuthors = [];
    searchPrices = [];

    if (self.state.textbookSearch != "") {

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
        if(title.indexOf(search) > -1 || author.indexOf(search) > -1){
          searchTitles.push(snapshot.val().title);
          searchAuthors.push(snapshot.val().author);
          searchPrices.push(snapshot.val().price);
        }
        else{
          console.log("Textbook not found");
        }
        self.setState({onCall: false});
      });
    }
    else {
      alert("please enter a book title or author")
    }
  }

  renderBody = ()=>{
    if(this.state.onCall){
      return(
        <Body style={{flex: 1, paddingTop: '5%'}}>
          <Text style={{alignItems: 'center', fontWeight: 'bold', fontSize: 16}}>Enter A Book Title or Author</Text>
        </Body>
      )
    }
    else{
      return(
        <SearchBody searchTitles={searchTitles} searchAuthors={searchAuthors} searchPrices={searchPrices} />
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
        <View style ={{flex:1}}>
          <Header
            style={styles.headerStyle}
            searchBar
            rounded
          >
            <Item>
              <Icon name="ios-search" onPress={this.searchTextbook}/>
              <Input
                // value={this.state.textbookSearch}
                placeholder="Search Textbook"
                onChangeText={(textbookSearch)=>this.setState({textbookSearch})}
              />
            </Item>
            <Button transparent onPress={this.searchTextbook}>
              <Text>Search</Text>
            </Button>
          </Header>

          {this.renderBody()}
        </View>

        <Footer>
          <FooterTab>
            <Button vertical
              onPress={() => this.props.switchScreen("account")}
              ><Icon name="ios-person" />
              <Text style={{color: 'black'}}>Account</Text>
            </Button>
            <Button vertical active
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
};

export default Search;
