import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker
} from 'react-native';
import {SearchInput} from './SearchInput';

let config = require('../Config');
let dt = require('../localData');
var take;

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${date} ${monthsText[month]} ${year}(${daysText[day]})`;
}

Date.prototype.year = function() {
  let year = this.getFullYear();
  return `${year}`;
}

Date.prototype.month = function() {
  let month = this.getMonth();
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  return `${monthsText[month]}`;
}

export default class EventScreen extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      viewSource: [],
      filterData: [],
      type: false,
      pickerDisplay: false,
      department: false,
      value: '',
      input: false,
      year: '',
      month: '',
      uta: false,
      isRefresh: false,
    };

    this.load = this.load.bind(this);
    this.search = this.search.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Event',
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
    let date = new Date(`${item.startDate}`);
    return(
      <View style={styles.eContainer}>
        <Text style={styles.eventHeader}>
          {date.formatted()}
        </Text>
        <TouchableHighlight
        underlayColor={'#cccc'}
        onPress={ () => {
                this.props.navigation.navigate('EvDetails', {
                  dataTitle: `${item.title}`,
                  dataDate: `${item.startDate}`,
                  dataVenue: `${item.venue}`,
                  dataFee: `${item.fee}`,
                  dataImage: `${item.image}`,
                  dataTime: `${item.time}`
                })
              }}
        >
        <View style={styles.eventContainer}>
          <Image
          source={{uri:(`${item.image}`)}}
          style={styles.image}
          />
          <Text style={styles.eventText}>
          {item.title}
          </Text>
        </View>
        </TouchableHighlight>
      </View>
    );
  }

  keyExtractor = (item) => {return(item.id.toString())}

  componentDidMount(){
      this.load();
  }

  load(){
    let url = config.settings.serverPath + '/MyUTAR/getEvents.php';

    this.setState({isRefresh: true})

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
          filterData: responseJSON.event,
          viewSource: responseJSON.event,
          isRefresh: false
        })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  search(){
    let url = config.settings.serverPath + '/MyUTAR/searchEvents.php?keyword=' + this.state.value;
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
        viewSource: responseJSON.event,
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

  DepartmentFilter(){
    this.setState({
      department: !this.state.department
    })
  }

  TypeFilter(){
    this.setState({
      type: !this.state.type
    })
  }

  utaFilter(){
    this.setState({
      uta: !this.state.uta
    })
  }

  filterYear(date){
    this.setState({
      viewSource : this.state.filterData.filter(x => new Date(x.endDate).year() === date)
    })
  }

  filterMonth(date){
    this.setState({
      viewSource : this.state.filterData.filter(x => new Date(x.endDate).month() === date)
    })
  }

  filterDep(term){
    this.setState({
      viewSource : this.state.filterData.filter(x => x.dId === term)
    })
  }

  filterUTA(term){
    const tdy = new Date();

    if(term == 'Upcoming'){
      this.setState({
        viewSource : this.state.filterData.filter(x => new Date(x.startDate) > tdy)
      })
    }
    else if(term == 'Today'){
      this.setState({
        viewSource : this.state.filterData.filter(x => new Date(x.endDate).formatted() === tdy.formatted())
      })
    }
    else{
      this.setState({
        viewSource : this.state.filterData.filter(x => new Date(x.endDate) < tdy)
      })
    }
  }

  filterTp(term){
    if(term == 'None'){
      this.setState({
        viewSource: this.state.filterData
      })
    }
    else if(term == 'Campaign/Festival'){
      this.setState({
        viewSource : this.state.filterData.filter(x => x.type == 'Campaign' || x.type == 'Festival')
      })
    }
    else if(term == 'Seminar/Course/Workshop'){
      this.setState({
        viewSource : this.state.filterData.filter(x => x.type == 'Seminar' || x.type == 'Course' || x.type == 'Workshop')
      })
    }
    else{
      this.setState({
        viewSource : this.state.filterData.filter(x => x.type === term)
      })
    }
  }

  render() {
    take = this;
    var tdy = new Date();
    var prev = tdy.setFullYear(tdy.getFullYear() - 1);
    return (
      <View style={styles.container}>
        <Modal
        visible={this.state.pickerDisplay}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.togglePicker()}>
        <TouchableOpacity style={{backgroundColor:'rgba(25,25,25,0.5)', flex: 1}} onPress={() => this.togglePicker()}/>
        <View style={styles.mod}>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.DepartmentFilter(),this.togglePicker()}}>
            <Text style={styles.modText}>Department</Text>
          </TouchableHighlight>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.togglePicker(),this.TypeFilter()}}>
            <Text style={styles.modText}>Type</Text>
          </TouchableHighlight>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.togglePicker(),this.utaFilter()}}>
            <Text style={styles.modText}>Upcoming/Today/Archive</Text>
          </TouchableHighlight>
        </View>
        </Modal>
        <Modal
        visible={this.state.department}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.DepartmentFilter()}>
        <TouchableOpacity
          style={{backgroundColor:'rgba(25,25,25,0.5)', flex: 1}}
          onPress={() => this.DepartmentFilter()}
        />
        <View style={styles.mod2}>
          {dt.departments.map((item) => {return(
            <TouchableHighlight
              underlayColor='#cccc'
              style={styles.modCont2}
              key={item.dId}
              onPress={() => {this.filterDep(`${item.dId}`),this.DepartmentFilter()}}>
              <Text style={styles.modText2}>{item.dId}</Text>
            </TouchableHighlight>
          )})}
          </View>
          </Modal>
          <Modal
          visible={this.state.type}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.TypeFilter()}>
          <TouchableOpacity
            style={{backgroundColor:'rgba(25,25,25,0.5)', flex: 1}}
            onPress={() => this.TypeFilter()}
          />
          <View style={styles.mod2}>
            {dt.types.map((item) => {return(
              <TouchableHighlight
                underlayColor='#cccc'
                style={styles.modCont2}
                key={item.tp}
                onPress={() => {this.filterTp(`${item.tp}`),this.TypeFilter()}}>
                <Text style={styles.modText2}>{item.tp}</Text>
              </TouchableHighlight>
            )})}
          </View>
          </Modal>
          <Modal
          visible={this.state.uta}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.utaFilter()}>
          <TouchableOpacity
            style={{backgroundColor:'rgba(25,25,25,0.5)', flex: 1}}
            onPress={() => this.utaFilter()}
          />
          <View style={styles.mod2}>
            {dt.uta.map((item) => {return(
              <TouchableHighlight
                underlayColor='#cccc'
                style={styles.modCont2}
                key={item.u}
                onPress={() => {this.filterUTA(`${item.u}`),this.utaFilter()}}>
                <Text style={styles.modText2}>{item.u}</Text>
              </TouchableHighlight>
            )})}
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
          <View style={styles.mod3}>
            <SearchInput
              autoFocus={true}
              style={styles.searchInput}
              placeholder={'Search here...'}
              value={this.state.value}
              onChangeText={(value) => this.setState({value})}
              onSubmitEditing={this.search}
              keyboardType={'default'}
            />
            </View>
          </Modal>
          <View style={styles.pickContainer}>
          <Picker
            style={styles.picker}
            mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
            selectedValue={this.state.year}
            onValueChange={
                (itemValue, itemIndex) => {this.setState({year: itemValue}), this.filterYear(itemValue)}
            }>
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2019" value="2019" />
          </Picker>
          <Picker
            style={styles.picker}
            mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
            selectedValue={this.state.month}
            onValueChange={
                (itemValue, itemIndex) => this.setState({month: itemValue}, this.filterMonth(itemValue),console.log(this.state.viewSource))
            }>
            <Picker.Item label="Jan" value="Jan" />
            <Picker.Item label="Feb" value="Feb" />
            <Picker.Item label="Mar" value="Mar" />
            <Picker.Item label="Apr" value="Apr" />
            <Picker.Item label="May" value="May" />
            <Picker.Item label="Jun" value="Jun" />
            <Picker.Item label="Jul" value="Jul" />
            <Picker.Item label="Aug" value="Aug" />
            <Picker.Item label="Sep" value="Sep" />
            <Picker.Item label="Oct" value="Oct" />
            <Picker.Item label="Nov" value="Nov" />
            <Picker.Item label="Dec" value="Dec" />
            </Picker>
          </View>
        <FlatList
          refreshing={this.state.isRefresh}
          onRefresh={this.load}
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 460,
    width: 280,
  },
  eContainer:{
    flex: 1,
    padding: 5,
    margin: 10,
  },
  eventContainer:{
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  eventText:{
    fontSize: 18,
    textAlign: 'center'
  },
  eventHeader:{
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'red',
    color: 'white'
  },
  mod: {
     position: 'absolute',
     right: 5,
     top: 5,
     width: 200,
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
  mod2: {
     position: 'absolute',
     top: 100,
     right: 60,
     width: 230,
     backgroundColor: 'white',
     borderRadius: 8,
     borderColor: 'rgba(255, 255, 255, 0.4)',
     zIndex: 1,
  },
  modCont2:{
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  modText2:{
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
  mod3: {
     position: 'absolute',
     top: 0,
     right: 0,
     width: 360,
     backgroundColor: 'white',
     zIndex: 1,
  },
  option: {
    height: 35,
    width: 40,
    margin: 5
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
  picker: {
     margin: 5,
     height: 30,
     width: 90,
     color: 'black',
  },
  pickContainer: {
    margin: 5,
    flexDirection: 'row'
  },
});
