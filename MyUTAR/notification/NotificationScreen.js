import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  SectionList,
  Image,
  TouchableOpacity,
} from 'react-native';

var take;

export default class NotificationScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Notification',
      headerRight:(
        <TouchableOpacity onPress={() => take.togglePicker()}>
          <Image
          style={styles.option}
          source={require('../images/opt.png')}
          />
        </TouchableOpacity>
      )
    };
  }

  constructor(props) {
    super(props)
    this.state = {
      not: [],
      pickerDisplay: false,
      department: false
    }
  }

  togglePicker(){
    this.setState({
      pickerDisplay: !this.state.pickerDisplay
    })
  }

  componentDidMount() {
    let notification = [
      {
        department: 'LKCFES',
        id: 1,
        airports: [
          {
            code: 'BNE',
            name: 'Brisbane',
          },
          {
            code: 'OOL',
            name: 'Gold Coast',
          },
          {
            code: 'MEL',
            name: 'Melbourne',
          },
        ]
      },
      {
        department: 'DIECS',
        id: 2,
        airports: [
          {
            code: 'BKI',
            name: 'aSta Kinabalu',
          },
          {
            code: 'KUL',
            name: 'Dala Lumpur',
          },
          {
            code: 'KCH',
            name: 'Kuching',
          },
        ]
      },
      {
        department: 'DASD',
        id: 3,
        airports: [
          {
            code: 'CKI',
            name: 'DDF Kinabalu',
          },
          {
            code: 'LSD',
            name: 'URFla Lumpur',
          },
          {
            code: 'KCH',
            name: 'Kuching',
          },
        ]
      },
      {
        department: 'DMAS',
        id: 4,
        airports: [
          {
            code: 'BKI',
            name: 'Kota Kinabalu',
          },
          {
            code: 'DUL',
            name: 'Kuala Lumpur',
          },
          {
            code: 'OOFK',
            name: 'Kuching',
          },
        ]
      },
    ];

    let sections = [];
    for(let i = 0; i < notification.length; i++) {
      sections.push({
        title: notification[i].department,
        data: notification[i].airports,
      });
    }

    this.setState({
      not: sections
    })
  }

  DepartmentFilter(){
    this.setState({
      department: !this.state.department
    })
  }

  filterDep(term){
    this.setState({
      not: this.state.not.filter(x => x.title === term)
    })
  }

  sorted(){
    this.setState({
      not: this.state.not.sort((a,b) => a.title < b.title ? -1 : 1)
    })
  }

  render() {
    take = this;
    let dp = [
      {Did: 'DIECS'},
      {Did: 'LKCFES'},
      {Did: 'DMAS'},
      {Did: 'DASD'},
      {Did: 'DCI'},
      {Did: 'DCL'},
      {Did: 'DME'},
      {Did: 'DMH'},
      {Did: 'D3E'},
    ]
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
          onPress={() => {this.togglePicker(),this.sorted()}}>
            <Text style={styles.modText}>Sort</Text>
          </TouchableHighlight>
          <TouchableHighlight
          underlayColor='#cccc'
          style={styles.modCont}
          onPress={() => {this.togglePicker(), this.DepartmentFilter()}}>
            <Text style={styles.modText}>Filter</Text>
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
            {dp.map((item) => {return(
              <TouchableHighlight
                underlayColor='#cccc'
                style={styles.modCont2}
                key={item.Did}
                onPress={() => this.filterDep(`${item.Did}`)}>
                <Text style={styles.modText2}>{item.Did}</Text>
              </TouchableHighlight>
            )})}
            </View>
        </Modal>
        <SectionList
          sections={ this.state.not }
          renderSectionHeader={ ({section}) =>
            <Text style={styles.header}>
              { section.title }
            </Text>
          }
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={ () => {
                this.props.navigation.navigate('NfDetails', {notification: `${item.id}`})
              }}
            >
              <View style={styles.item}>
                <Text style={styles.itemName}>
                  { `${item.name} (${item.code})` }
                </Text>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item) => {item.code}}
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
  header: {
    backgroundColor : 'grey',
    fontSize : 24,
    fontWeight: 'bold',
    padding: 10,
    color: '#fff',
  },
  item: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCode: {
    fontSize: 18,
  },
  option: {
    height: 40,
    width: 40,
    margin: 10
  },
  modText:{
    color: 'black',
    fontSize: 22,
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
});
