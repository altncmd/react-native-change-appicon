/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
// var ChangeAppIcon = NativeModules.ChangeAppIcon;
import ChangeAppIcon from 'react-native-change-appicon'
const { width } = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            ds:[],
            icons:[],
        };
    }

    componentDidMount() {
        this.setState({
            ds:[
                require('./img/icon01.png'),
                require('./img/icon02.png'),
                require('./img/icon03.png'),
                require('./img/icon04.png'),
                require('./img/icon05.png'),
                require('./img/icon06.png'),
                require('./img/icon07.png'),
                require('./img/icon08.png'),
                require('./img/icon09.png'),
                require('./img/icon10.png'),
                require('./img/icon11.png'),
                require('./img/icon12.png'),
                require('./img/icon13.png'),
                require('./img/icon14.png'),
                require('./img/icon15.png'),
            ]
        });

        for (let i = 1; i <= 15; i ++) {
            let name = i > 9 ? 'icon'+i+'.png':'icon0'+i+'.png';
            this.state.icons.push(name)
        }

        // setTimeout(()=>this._itemDidSelected(10), 3000)
    }

    _itemDidSelected = (index) => {
        // console.log(index);
        ChangeAppIcon.changeAppIconWithName(this.state.icons[index]);
        // ChangeAppIcon.testPrint("Jack", {
        //     height: '1.78m',
        //     weight: '7kg'
        // });
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{ height:60, width:width-16, flexDirection:'row', alignItems:'center' }}
                onPress={this._itemDidSelected.bind(this,index)}
            >
                <View style={{ width:44, justifyContent:'center' }}>
                    <Text style={{ fontSize:20, fontWeight:'bold' }}>{index+1}</Text>
                </View>
                <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                    <Image style={{ width:44, height:44 }} source={item}/>
                </View>
                <View style={{ width:20, height:26 }}>
                    <Image style={{ flex:1 }} source={require('./img/right.png')}/>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.ds}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={()=>(<View style={{ height:1, backgroundColor:'#ccc' }}/>)}

                    style={{ flex:1, margin:8 }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
