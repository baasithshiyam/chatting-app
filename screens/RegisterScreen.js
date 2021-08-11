import React,{useLayoutEffect, useState} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import {StyleSheet, View } from 'react-native'
import { Image ,Input,Button ,Text} from 'react-native-elements';
import { StatusBar } from 'react-native';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [imageUrl , setImageUrl] = useState("");

    useLayoutEffect(() => { 
        navigation.setOptions({
            headerBackTitle:"Back",
        });
    }, [navigation]);


    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName : name,
                photoURL : imageUrl || 'https://img.icons8.com/clouds/100/000000/teamspeak-new-logo.png',

            })
        }).catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style = "light" />
            <Text h3 style={{marginBottom:50}}> Create your Account </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full name"
                    autoFocus
                    type ="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                 <Input
                    placeholder="Email" 
                    type ="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                 <Input
                    placeholder="password"
                    type ="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                 <Input
                    placeholder="profile picture / Optional"
                    type ="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />

                <Button 
                    onPress={register}
                    title="Register"
                    raised
                    containerStyle={styles.button}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container: {
        flex:1 ,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "white",
    },
    inputContainer : {
        width:300 ,
    },
    button:{
        width : 200,
        marginLeft : 40,
        marginTop :10,
    },
});