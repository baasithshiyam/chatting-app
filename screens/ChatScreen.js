import React,{useLayoutEffect,useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import {  Avatar,Button } from 'react-native-elements';
import { AntDesign ,FontAwesome,Ionicons,SimpleLineIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import firebase from 'firebase';
import { auth , db } from '../firebase';

const ChatScreen = ({navigation, route}) => {

    const [input,setInput] = useState("");
    const [messages ,setMessages] =useState([]);
    useLayoutEffect(() => { 
        navigation.setOptions({
            title:"hat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle : () =>(
                <View style={{flexDirection:"row",alignItems:"center"}}>
                
                    <Avatar
                        rounded
                        source={{uri: messages[0]?.data.photoURL ||
                            "https://img.icons8.com/clouds/100/000000/teamspeak-new-logo.png",}}
                    />
                    <Text
                    style={{color:"white",marginLeft:10,fontWeight: "700"}}
                    > {route.params.chatName} </Text>
              
              
            </View>
            ),

            headerLeft : () =>(
                <TouchableOpacity
                    style={{margin:10}}  
                    onPress={navigation.goBack}  
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            ),

            headerRight : () => (
                <View
                    style={{
                        flexDirection:"row",
                        justifyContent:'space-between',
                        width:80,
                        marginRight:20,
                    
                    }}>
                        

                        <TouchableOpacity>
                            <FontAwesome name="video-camera" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="call" size={24} color="white" />
                        </TouchableOpacity>
                        
                    </View>
                
            ),


        });

    
    }, [navigation]);

const sendMessage = () =>{
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
        message: input,
        displayName : auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL :auth.currentUser.photoURL,
    });

    setInput("")
}


    useLayoutEffect(() =>{
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data : doc.data(),
                }))
            ));
                return unsubscribe;
    },[route]);

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                 <StatusBar style = "light" />
                 <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                    keyboardVerticalOffset={90}
                 >
                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <ScrollView contentContainerStyle={{paddingTop:15}}>
                                {messages.map(({id, data}) => (
                                    data.email === auth.currentUser.email ?(
                                        <View key={id} style={styles.reciever}>
                                            <Avatar 
                                                rounded
                                                position="absolute"
                                                bottom={-15}

                                                containerStyle={{
                                                    position:"absolute",
                                                    bottom:-15,
                                                    right:-5,
                                                }}
                                                right={-5}
                                                size={30}
                                                source={{
                                                    uri: data.photoURL,
                                                }}
                                            />
                                            <Text style={styles.reciverText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                        <View  key={id} style={styles.sender}>
                                            <Avatar 
                                              rounded
                                              position="absolute"
                                              bottom={-15}

                                              containerStyle={{
                                                  position:"absolute",
                                                  bottom:-15,
                                                  right:-5,
                                              }}
                                              right={-5}
                                              size={30}
                                              source={{
                                                  uri: data.photoURL,
                                              }}
                                            />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>

                                    )
                                ))}
                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput placeholder= "message" style={styles.textInput}
                                    value={input}
                                    onSubmitEditing={sendMessage}
                                    onChangeText={(text) => setInput(text)}
                                />
                                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                 <Ionicons name="send" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </>
                        </TouchableWithoutFeedback>
                 </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    container:{
        flex:1,
    },
    senderName:{
        left:10,
        paddingRight: 10,
        fontSize:10,
        color:"white",
    },
    senderText:{
        marginLeft:10,
        marginBottom: 10,
        fontWeight:"600",
        color:"white",
    },
    reciverText:{
        marginLeft:10,
        fontWeight:"600",
        color:"black",
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight: 15,
        borderColor:"transparent",
        backgroundColor: "#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius: 30,
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:10,
        marginBottom:20,
        maxHeight:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin : 15,
        maxWidth:"80%",
        position:"relative",
    }
})
