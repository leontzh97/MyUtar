import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import {SearchInput,PickerWithLabel} from '../UI/UI';

let dt = require('../localData');
let config = require('../Config');
var take;

export default class NotificationScreen extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      viewSource: [],
      filterData: [],
      department: '',
      value: '',
      pickerDisplay: false,
      input: false,
      isRefresh: false
    };

    this._load = this._load.bind(this);
    this._search = this._search.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Notification',
      headerRight:(
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => take.searchBar()}>
          <Image
          style={styles.search}
          source={require('../images/search-icon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => take.togglePicker()}>
          <Image
          style={styles.option}
          source={require('../images/opt.png')}
          />
        </TouchableOpacity>
        </View>
      )
    };
  }

  renderItems = ( { item } ) => {
    return(
      <View style={styles.nContainer}>
        <TouchableHighlight
        underlayColor={'#cccc'}
        onPress={ () => {
                this.props.navigation.navigate('NfDetails', {
                  dataTitle: `${item.title}`,
                  dataDesc: `${item.description}`
                })
              }}
        >
        <View>
        <Text numberOfLines={2} style={styles.notTitle}>
          {item.title}
        </Text>
        </View>
        </TouchableHighlight>
      </View>
    )
  }

  keyExtractor = (item) => {return(item.id.toString())}

  componentDidMount(){
      this._load();
  }

  _load(){
    let url = config.settings.serverPath + '/MyUTAR/getNotification.php';

    this.setState({isRefresh: true});

    fetch(url)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    })
    .then((responseJSON) => {
      this.setState({
        viewSource: responseJSON.notification,
        filterData: responseJSON.notification,
        isRefresh: false
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _search(){
    let url = config.settings.serverPath + '/MyUTAR/searchNotification.php?keyword=' + this.state.value;
    this.setState({isRefresh: true});

    fetch(url)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }
      return response.json()
    })
    .then((responseJSON) => {
      this.setState({
        viewSource: responseJSON.notification,
        isRefresh: false
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  searchBar(){
      this.setState({
        input: !this.state.input
      })
  }

  togglePicker(){
    this.setState({
      pickerDisplay: !this.state.pickerDisplay
    })
  }

  sorted(term){
    if(term == 'asc'){
      this.setState({
        viewSource: this.state.viewSource.sort((a,b) => a.title < b.title ? -1 : 1)
      })
    }
    else {
      this.setState({
        viewSource: this.state.viewSource.sort((a,b) => a.title > b.title ? -1 : 1)
      })
    }
    //console.log(this.state.viewSource.sort((a,b) => a.title < b.title ? -1 : 1))
  }

  filtered(term){
    if(term == 'ALL'){
      this.setState({
        viewSource: this.state.filterData
      })
    }
    else{
      this.setState({
        viewSource: this.state.filterData.filter(x => x.dId === term)
      })
    }
  }

  render() {
    take = this;
    return (
      <View style={styles.container}>
        <Modal
        visible={this.state.pickerDisplay}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.togglePicker()}>
        <TouchableOpacity style={{backgroundColor:'rgba(25,25,25,0.5)', flex: 1}} onPress={() => this.togglePicker()}/>
        <View style={styles.mod}>
        <Text style={styles.modTitle}>Sorted By</Text>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.togglePicker(),this.sorted('asc')}}>
            <Text style={styles.modText}>Ascending Order</Text>
          </TouchableHighlight>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.togglePicker(),this.sorted('desc')}}>
            <Text style={styles.modText}>Descending Order</Text>
          </TouchableHighlight>
        </View>
        </Modal>
        <Modal
        visible={this.state.input}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.searchBar()}>
        <TouchableOpacity
          style={{backgroundColor:'rgba(0,0,0,0)', flex: 1}}
          onPress={() => this.searchBar()}
        />
        <View style={styles.mod2}>
          <SearchInput
            autoFocus={true}
            style={styles.searchInput}
            placeholder={'Search here...'}
            value={this.state.value}
            onChangeText={(value) => this.setState({value})}
            onSubmitEditing={this._search}
            keyboardType={'default'}
          />
          </View>
        </Modal>
        <PickerWithLabel
          style={styles.picker}
          items={dt.departments}
          mode={'dialog'}
          value={this.state.department}
          onValueChange={
            (itemValue, itemIndex) => {this.setState({department: itemValue}), this.filtered(itemValue)}
          }
          textStyle={{fontSize: 24}}
          orientation={'horizontal'}
        />
        <FlatList
          refreshing={this.state.isRefresh}
          onRefresh={this._load}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          data={this.state.viewSource}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  option: {
    height: 35,
    width: 40,
    margin: 5
  },
  picker: {
     color: 'black',
     marginTop: 5,
     marginBottom: 5,
     left: 25,
     width: 300
  },
  button: {
    marginTop: 10,
    marginBottom: 50,
  },
  nContainer:{
    flex: 1,
    padding: 5,
    margin: 10,
    height: 65,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
  notTitle:{
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  mod: {
     position: 'absolute',
     right: 5,
     top: 5,
     width: 240,
     backgroundColor: 'white',
     borderRadius: 8,
     borderColor: 'rgba(255, 255, 255, 0.4)',
     zIndex: 1,
  },
  modCont:{
    alignItems: 'center',
    padding: 5
  },
  modText:{
    color: 'black',
    fontSize: 22,
    textAlign: 'center'
  },
  modTitle:{
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  mod2: {
     flexDirection: 'row',
     position: 'absolute',
     top: 0,
     right: 0,
     width: 360,
     backgroundColor: 'white',
     zIndex: 1,
  },
  search: {
    height: 35,
    width: 40,
    margin: 5
  },
  searchInput:{
    height: 46,
    width: 340,
    margin: 5
  },
  searchBar: {
    width: 100,
    margin: 5
  },
});
