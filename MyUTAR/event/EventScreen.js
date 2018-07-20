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
  Alert
} from 'react-native';
import {DatePicker} from './DatePicker';

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

export default class EventScreen extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      viewSource: [],
      dataSource: [],
      filterData: [],
      type: false,
      pickerDisplay: false,
      department: false,
      dId: [],
      eType: [],
      value: '',
      input: false
    }
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
    let date = new Date(`${item.date}`);
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
                  dataDate: `${item.date}`,
                  dataVenue: `${item.venue}`,
                  dataFee: `${item.fee}`,
                  dataLink: `${item.link}`,
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

  setPicker(value){
    this.setState({
      action: value
    })

    if(this.DepartmentFilter())
      this.DepartmentFilter();

    if(this.togglePicker())
      this.togglePicker();
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

  componentDidMount(){
      let url = 'http://192.168.0.117:8081/db.json';

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
            dataSource: responseJSON.events,
            filterData: responseJSON.events,
            viewSource: responseJSON.events,
            dId: responseJSON.departmentID,
            eType: responseJSON.type
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  filterDep(term){
    this.setState({
      filterData: this.state.dataSource,
      viewSource : this.state.filterData.filter(x => x.department === term)
    })
  }

  filterTp(term){
    this.setState({
      filterData: this.state.dataSource,
      viewSource : this.state.filterData.filter(x => x.type === term)
    })
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
        <Text style={styles.modTitle}>Filter By</Text>
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
          {this.state.dId.map((item) => {return(
            <TouchableHighlight
              underlayColor='#cccc'
              style={styles.modCont2}
              key={item}
              onPress={() => this.filterDep(`${item}`)}>
              <Text style={styles.modText2}>{item}</Text>
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
            {this.state.eType.map((item) => {return(
              <TouchableHighlight
                underlayColor='#cccc'
                style={styles.modCont2}
                key={item}
                onPress={() => this.filterTp(`${item}`)}>
                <Text style={styles.modText2}>{item}</Text>
              </TouchableHighlight>
            )})}
          </View>
          </Modal>
        <DatePicker />
        <FlatList
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
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  modText:{
    color: 'black',
    fontSize: 22,
  },
  mod2: {
     position: 'absolute',
     top: 100,
     right: 80,
     width: 200,
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
  },
  modTitle:{
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  option: {
    height: 35,
    width: 40,
    margin: 5
  },
  search: {
    height: 35,
    width: 35,
    margin: 5
  },
  searchBar: {
    width: 100,
    margin: 5
  }
});
