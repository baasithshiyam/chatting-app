import React,{useLayoutEffect,useState,useEffect} from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import ListItems from '../component/ListItems'
import {  Avatar,Button } from 'react-native-elements';
import { auth ,db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import { AntDesign ,SimpleLineIcons} from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {


    const [chats,setChats] = useState([]);

    const signOutUser = () =>{
        auth.signOut().then(() =>{
            navigation.replace("Login");
        });
    }

    useEffect(() => {
        const unsubscribe =db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id :doc.id,
                data : doc.data()
            })))
        ))
        return unsubscribe;
    }, [])

    useLayoutEffect(() => { 
        navigation.setOptions({
            title: "Chat with De_Viper",
            headerStyle :{backgroundColor: '#fff'},
            headerTitleStyle: {color :"black"},
            headerTintColor: "black",
            headerLeft : () => (
            <View style={{marginLeft:20}}>
                <TouchableOpacity 
                    onPress={signOutUser}
                    activeOpacity={0.5}>
                    <Avatar
                        rounded
                        source={{uri: auth?.currentUser?.photoURL}}
                    />
                </TouchableOpacity>
              
            </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,
                }}>
                  
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" 
                        onPress={() => navigation.navigate('AddChat')}
                        size={24} color="black"/>
                    </TouchableOpacity>


                </View>
            ),
        });
    }, [navigation]);


    const enterChat =(id,chatName) =>{
        navigation.navigate("Chat",{
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {chats.map(({id, data :{ chatName}}) =>(
                     <ListItems key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%",
    },
});
