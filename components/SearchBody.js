import React from 'react';
import {
  ScrollView, Text, View, ListView, Platform,
  StyleSheet, CheckBox, ActivityIndicator, Dimensions, Modal
} from 'react-native';
import {
  ListItem, List, Content, Container, Button, Icon, TouchableOpacity
} from 'native-base';
import firebase from './Firebase';

import { Header, Thumbnail, Left, Body, Right } from 'native-base';


class SearchBody extends React.Component {

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      // listViewData: data,
      titles: [],
      authors: [],
      prices: [],
      conditions: [],
      cities: [],
      isbns: [],
      subjects: [],
      emails: [],
      uids: [],
      data: [],
      index: 0,
      newContact: "",
      dataSource: dataSource,
      infoState: false,
    }
  }
  
  render() {
    this.state.titles = this.props.searchTitles;
    this.state.authors = this.props.searchAuthors;
    this.state.prices = this.props.searchPrices;
    this.state.conditions = this.props.searchConditions;
    this.state.cities = this.props.serachCities;
    this.state.isbns = this.props.searchISBNs;
    this.state.subjects = this.props.serachSubjects;
    this.state.emails = this.props.serachEmails;
    this.state.uids = this.props.serachUids;
    this.state.data = [];

    // this.state.data.titles = this.state.titles;
    for (var i = 0; i < this.state.titles.length; i++) {
      this.state.data.push({ 'title': this.state.titles[i], 'author': this.state.authors[i], 'price': this.state.prices[i], 'index': i, 
      'condition': this.state.conditions[i], 'city': this.state.cities[i], 'isbn': this.state.isbns[i], 'subject': this.state.subjects[i],
      'email': this.state.emails[i], 'uid': this.state.uids[i]
      });
    }

    if (!this.state.titles) {
      return <View />
    }
    // var textbook = this.props.info;

    // if(!textbook){
    //   return<View/>
    // }
    return (
      <Container>
        <Content>
          <List
            style={{ flex: 1 }}
            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
            renderRow={data =>
              <ListItem>
                <Body style={{ paddingLeft: '3%' }}>
                  <Text style={{ fontWeight: 'bold' }}> {data.title} </Text>
                  <Text note numberOfLines={1}> {data.author} </Text>
                </Body>
                <Text style={{ fontWeight: 'bold' }}> ${data.price} </Text>
                {/*MODAL*/}
                <Modal 
                animationType="slide"
                visible={this.state.infoState}
                  onRequestClose={() => console.warn("this is a close request")}>
                  {/* <ScrollView style ={{flex:1}}>
                  <View style={{marginTop: 22}}>
                    <ListItem itemDivider>
                      <Text style={styles.header}>{this.state.titles[this.state.index]}{'\n'}</Text>
                      <View style ={styles.info}>
                      <ListItem itemDivider>
                        <Text style ={{fontWeight: 'bold'}}>TEST</Text>
                      </ListItem>
                      </View>
                    </ListItem>
                    <Right>
                      <Button
                        style={styles.container}
                        onPress={() => {
                          this.setState({
                            infoState: false
                          })
                        }}>
                        <Text> close </Text>
                      </Button>
                    </Right>
                  </View>
                  </ScrollView> */}
                  <ScrollView style = {{flex: 1}}>
                    <Text style={styles.header}>{this.state.titles[this.state.index]} by {this.state.authors[this.state.index]}</Text>
                    <View style={styles.info}>
                      <ListItem item Divider>
                        <Text style={{fontWeight: 'bold'}}>Price: ${this.state.prices[this.state.index]}</Text>
                      </ListItem>  
                      <ListItem>
                      <Text style={{fontWeight: 'bold'}}>Subject: {this.state.subjects[this.state.index]}</Text>
                      </ListItem>
                      <ListItem>
                      <Text style={{fontWeight: 'bold'}}>IBSN: {this.state.isbns[this.state.index]}</Text>
                      </ListItem>
                      <ListItem>
                      <Text style={{fontWeight: 'bold'}}>Condition: {this.state.conditions[this.state.index]}</Text>
                      </ListItem>
                      <ListItem>
                      <Text style={{fontWeight: 'bold'}}>Seller's Location: {this.state.cities[this.state.index]}</Text>
                      </ListItem>
                      <ListItem>
                      <Text style={{fontWeight: 'bold'}}>Seller Contact Info: {this.state.emails[this.state.index]}</Text>
                      </ListItem>
                    </View>
                    <View
                      style={{justifyContent: 'center', textAlign: 'center'}}
                    >
                    <Right>
                    <Button 
                        style={styles.container}
                        onPress={() => {
                          this.setState({
                            infoState: false
                          })
                        }}>
                        <Text> close </Text>
                      </Button>
                    </Right>
                    </View>
                  </ScrollView>
                </Modal>
                {/*BUTTON THAT TAKES YOU TO THE NEW SCREEN */}
                <Right>
                  <Button
                    var key = {data.index}
                    transparent
                    onPress={() => {
                      this.setState({
                        infoState: true,
                        index : data.index
                      })
                    }} 
                  >
                  
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
    );
  }
}

const styles = {
  header: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center'
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  img: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    marginTop: 40,
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

