import React from 'react';
import {ScrollView, Text, View, ListView} from 'react-native';
import{ListItem, List, Content, Container, Button, Icon} from 'native-base';
import firebase from './Firebase';

import {  Header, Thumbnail, Left, Body, Right } from 'native-base';

class SearchBody extends React.Component{

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
  
    this.state = {
      // listViewData: data,
      titles: [],
      authors: [],
      prices: [],
      data: [],
      newContact: "",
      dataSource: dataSource,
    }
  }

  render(){
      this.state.titles = this.props.searchTitles;
      this.state.authors = this.props.searchAuthors;
      this.state.prices = this.props.searchPrices;
      this.state.data=[];

      // this.state.data.titles = this.state.titles;
      for (var i=0; i<this.state.titles.length; i++) {
        this.state.data.push({'title': this.state.titles[i], 'author': this.state.authors[i], 'price' : this.state.prices[i]});
      }

      if (!this.state.titles) {
        return<View/>
      }
      // var textbook = this.props.info;

      // if(!textbook){
      //   return<View/>
      // }
      return(
        <Container>
          <Content>
            
          
            <List
              style={{flex: 1}}
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow = {data => 
                <ListItem>
                  <Body style={{paddingLeft: '3%'}}>
                    <Text style={{fontWeight: 'bold'}}> {data.title} </Text>
                    <Text note numberOfLines={1}> {data.author} </Text>
                  </Body>
                  <Text style={{fontWeight: 'bold'}}> ${data.price} </Text>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              }
              renderLeftHiddenRow={data => 
                <Button full>
                  <Icon name="information-circle" />
                </Button>
              }
              renderRightHiddenRow={data => 
                <Button full danger>
                  <Icon name="ios-trash" />
                </Button>
              }
              leftOpenValue={0}
              rightOpenValue={0}
            >
              
            </List>
          

          </Content>
        </Container>      
    )
  }
}

const styles = {
  header: {
    fontSize: 20,
    color: 'black',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  img: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.8
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}

export default SearchBody;
