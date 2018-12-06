import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import{ListItem,List} from 'native-base';

class SearchBody extends React.Component{
  test = () =>{
    console.log(this.props.info);
  }

  render(){
      var textbook = this.props.info;
      if(!textbook){
        return<View/>
      }
      return(
        <ScrollView style={{flex: 1}}>
          <Text style={styles.header}>{textbook.title} - {textbook.author}</Text>
        </ScrollView>

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
}

export default SearchBody;
