import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Container, Header, Content, Form, Item, Input } from 'native-base';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA_MfCMPy8STztdl6zX6xdmtyR-UGABOGU",
  authDomain: "booklist-9d89f.firebaseapp.com",
  databaseURL: "https://booklist-9d89f.firebaseio.com",
  projectId: "booklist-9d89f",
  storageBucket: "booklist-9d89f.appspot.com",
  messagingSenderId: "472931690649"
};

firebase.initializeApp(firebaseConfig);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) => {
    if (email != '' && password != '') {
      try {
        if(this.state.password.length < 5) {
          alert("password must be 5 or more characters");
          return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password);
        alert("account created");
      }
      catch(error) {
        console.log(error.toString())
      }
    }
    else {
      alert("please enter an email and password");
    }
  }

  // loginUser = (email, password, switchScreen) => {
  //   try {
  //     firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
  //       console.log(user);
  //       switchScreen("account");
  //     })
  //   }
  //   catch(error) {
  //     // console.log(error.toString())
  //     alert("incorrect email or password");
  //   }
  // }

  loginUser = (email, password, switchScreen) => {
    if (email != '' && password != '') {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
          console.log(user);
          switchScreen("account");
        })
      }
      catch(error) {
        // console.log(error.toString())
        alert("incorrect email or password");
      }
    }
    else {
      alert("please enter an email and password");
    }
  }

  render() {
    return (
      <Container>
        <Text style={styles.titleText}>BookList</Text>
        <Content>
          <Form style={styles.formStyle}>
            <Item>
              <Input 
                placeholder="Email"
                onChangeText={(email) => this.setState({email})} />
            </Item>
            <Item last>
              <Input 
                placeholder="Password" 
                secureTextEntry={true} 
                autocorrect={false} 
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})} />
            </Item>
          </Form>
          <Button rounded 
            style={styles.buttonStyle}
            // onPress={() => this.props.switchScreen("account")}
            onPress = {() => this.loginUser(this.state.email, this.state.password, this.props.switchScreen)}
            ><Text style={styles.buttonText}>Log In</Text>
          </Button>
          <Button rounded 
            style={styles.buttonStyle}
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
            ><Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  titleText: {
    alignSelf: 'center',
    fontSize: 40,
    marginTop: '40%'
  },
  formStyle: {
    marginBottom: 30
  },
  buttonStyle: {
    width: '40%',
    marginBottom: 30,
    marginLeft: '30%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
};

export default Login;
