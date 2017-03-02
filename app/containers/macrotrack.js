/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//BAREMIN
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class AwesomeProject extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Welcome to React Native!</Text>
//       </View>
//     );
//   }
// }
//BAREMIN

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

var allMacros = ["Calories","Protein", "Carbs", "Fat"];
var trackedMacros = [];


// window.onload = function(){
//   AsyncStorage.setItem('allMacros', allMacros);
//   var data = AsyncStorage.getItem('allMacros');
//   console.log(data.spLit(','));
// }


// Anywhere we have a reference to a Person (that extends EventEmitter)
//person.subscribe('namechanged', function(data) { alert(data.name); });

// in the Person object
//this.dispatch('namechanged', { name: 'John' });

// class App extends Component {
//   renderTrackers(){
//     var Macros = ["Calories","Protein", "Carbs", "Fat"]
//     var arrayLength = Macros.length;
//     var returnValue = [];
//     for (var i = 0; i < arrayLength; i++){
//       returnValue[i] = this.renderTracker(Macros[i], i);
//     }
//     console.log("New tracker");
//     return returnValue;
//   }

//   renderTracker(name, key){
//     return <Tracker key={key} name={name} value='0'/>;
//   }

//   render() {
//     return (
//       <View className="App">
//         <View style={styles.shadow}>
//           <Text style={[styles.head1, styles.horizontalCenter]}>Macrotrack</Text>
//         </View>
//         <Favorites />
//         <View className="TrackerList">
//           {this.renderTrackers()}
//         </View>
//       </View>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Counter
        counter={state.count}
        {...actions} />
    );
  }
}




class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      showReply: false
    }
  }
  _handlePress(){
    this.setState({showReply: !this.state.showReply})
  }

  // Close the dropdown menu if the user cLicks outside of it
  // window.oncLick = function(event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = document.getElementsByClassName("a");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }

  render() {
    return (

      <View className="Favorites" style={styles.favorites}>
        <Text></Text>
        <Button title="Favorites" onPress={() => this._handlePress()} className="dropdown" color='#7BAFD4'>
          Favorites
        </Button>
        {this.state.showReply && <FavoriteList />}
      </View>
    );
  }
}

class FavoriteList extends Component {
  renderFavorites(){
    var favorites = [
      {
        name: 'Chicken Pasta',
        Calories: 600,
        Protein: 40,
        Carbohydrates: 80,
        Fat: 15
      },
      {
        name: 'Oatmeal',
        Calories: 600,
        Protein: 40,
        Carbohydrates: 80,
        Fat: 15
      },
      {
        name: 'Protein Shake',
        Calories: 600,
        Protein: 40,
        Carbohydrates: 80,
        Fat: 15
      },
      {
        name: 'Macaroni',
        Calories: 600,
        Protein: 40,
        Carbohydrates: 80,
        Fat: 15
      }
    ]

    var returnValue = [];

    for (var i = 0; i < favorites.length; i++){
      var object = favorites[i];
      //console.log(favorites[i]);
      returnValue[i] = this.renderFavorite(object);
    }
    
    return returnValue;
    
  }

  renderFavorite(item){
    return <Favorite key = {item.name} fav = {item} />;
  }

  render(){
    return(
      <ScrollView style={styles.scrollview} id="favoriteList" className="InnerShadow">
        {this.renderFavorites()}
      </ScrollView>
    );
  }
}

class Favorite extends Component {
    constructor(props) {
    super();
    //console.log(props);
    this.state = {
      Name: props.fav.name,
      Calories: props.fav.Calories,
      Protein: props.fav.Protein,
      Carbohydrates: props.fav.Carbohydrates,
      Fat: props.fav.Fat
    };
  }

  render(){
    return(
      <View style={[styles.dropDownItem, styles.padTopBot]}>
        <Text key={this.state.Name} style={[styles.head2, styles.flex2]}>{this.state.Name}</Text>
        <View style={styles.button2}>
              <Button title=" - " color='#7BAFD4' type="button" onPress={console.log("-")}>-</Button>
        </View>
        <View style={styles.button2}>
          <Button title=" + " color='#7BAFD4' type="button" onPress={console.log("+")}>+</Button>
        </View>
      </View>
    );
  }

}

class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      value: '0'
    };
  }

  increment(value){
    return "" + (parseInt(this.state.value)+value);
  }

  onChange(text) {
      let newText = '';
      let numbers = '0123456789';

      for (var i = 0; i < text.length; i++) {
          if ( numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
      }   
      this.setState({value: value})
  }

  render() {
    return (
      <View>
        <Text></Text>
        <View style={styles.tracker} className="Tracker" key={this.props.name}>
          <Text style={[styles.head2, styles.button, styles.flex1]}>{this.props.name}:</Text>
          
          <TextInput 
            style={[styles.button, styles.input, styles.flex1]}
            keyboardType = 'numeric'
            onChangeText = {(value)=> this.onChange(value)}
            value = {this.state.value}
          />

          <View style={styles.button}>
            <Button title="+1" color='#7BAFD4' type="button" onPress={() => this.setState({value: this.increment(1)})}>+1</Button>
          </View>

          <View style={styles.button}>
            <Button title="+10" color='#7BAFD4' type="button" onPress={() => this.setState({value: this.increment(10)})}>+10</Button>
          </View>

          <View style={styles.button}>
            <Button title="+100" color='#7BAFD4' type="button" onPress={() => this.setState({value: this.increment(100)})}>+100</Button>
          </View>

          <View style={styles.button}>
            <Button title="-" color='#7BAFD4' type="button" onPress={() => this.setState({value: '0'})}>-</Button>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollview: {
    height: 184
  },
  favorites: {
    marginRight: 5,
    marginLeft: 5
  },
  padTopBot: {
    paddingTop: 5,
    paddingBottom: 5
  },
  dropDownItem: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  button2: {
    marginLeft: 5,
    marginRight: 5
  },
  head1: {
    backgroundColor: '#7BAFD4',
    fontSize: 40,
    color: 'white'
  },
  tracker: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  textInput: {
    flex: .5
  },
  head2: {
    fontSize: 20
  },
  input: {
    textAlign: 'right'
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  horizontalCenter: {
    textAlign: 'center'
  }
});

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(App);