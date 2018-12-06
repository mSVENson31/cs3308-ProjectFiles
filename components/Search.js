import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// imports for native-base components
import { Root, Container, Header, Left, Body, Right,
Button, Icon, Title, Content, Footer, FooterTab,
List, ListItem, Separator, Input, Item, Form, Picker } from 'native-base';
import { Font, AppLoading } from "expo";
import SearchBody from './SearchBody';
import firebase from './Firebase';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selected1: undefined,
      selected2: undefined,
      textbookSearch: "test",
      onCall: true,
      info: {},
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

  searchTextbook = (searchText) =>{
    this.setState({onCall: true});
    var match = false;
    var self = this;
    var firebaseRef = firebase.database().ref();

    var listingsRef = firebaseRef.child("/listings");
    // firebase.database().ref('listings').on('value', (data) => {
    //   var name = data.key;
    //   console.log(name);
    //   self.setState({info:data.toJSON().info})
    //   self.setState({onCall: false});
    // })
    listingsRef.on('child_added', function(snapshot) {
      var title = snapshot.val().title;
      var author = snapshot.val().author;
      var search = self.state.textbookSearch;
      var id = snapshot.key;
      //var userSearch = this.state.textbookSearch;
      // console.log(self.state.textbookSearch);
      // console.log("id:");

      // if(self.state.textbookSearch == snapshot.val().title){
      //   console.log(author);
      // }
      // else {
      //   console.log("Textbook not found");
      // }

      if(title.indexOf(search) > -1 || author.indexOf(search) > -1){
        console.log("IT WORKS");
        self.setState({info:snapshot.val()});
      }
      else{
        console.log("Textbook not found");
      }
      self.setState({onCall: false});
    });
  }
  renderBody = ()=>{
    if(this.state.onCall){
      return(
        <Text>Loading</Text>
      )
    }
    else{
      return(

        <SearchBody info={this.state.info}/>
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
              <Icon name="ios-search"/>
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
        <Content>

        </Content>

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
