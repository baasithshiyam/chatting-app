import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem ,Avatar,Button } from 'react-native-elements';
import { db } from '../firebase';


const ListItems = ({id,chatName,enterChat}) => {

    const [chatMessage,setChatMessage] = useState([]);
    useEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot) =>
            setChatMessage(
                snapshot.docs.map((doc) => doc.data()))
                );
                return unsubscribe;
    })
    return (
        <ListItem
            onPress={() => enterChat(id,chatName)}
            key={id} 
            bottomDivider> 
           <Avatar 
                rounded
                source={{ 
                    uri: chatMessage?.[0]?.photoURL || "https://img.icons8.com/clouds/100/000000/gender-neutral-user.png",
                }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight:"bold"}}>
                        {chatName}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                        {chatMessage?.[0]?.displayName}:{chatMessage?.[0]?.message} 
                    </ListItem.Subtitle>
                </ListItem.Content>
        </ListItem>
        
    )
}

export default ListItems

const styles = StyleSheet.create({})
