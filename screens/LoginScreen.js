import React ,{useState,useEffect}from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Image ,Input,Button } from 'react-native-elements';
import { auth } from '../firebase';



const  LoginScreen = ({navigation}) => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");


    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((authUser) => {
           console.log(authUser)
            if(authUser){
                navigation.replace("Home")
            }
        });

        return unsubscribe;
       
    }, [])

    const signIn = () => {
            auth.signInWithEmailAndPassword(email,password)
            .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <StatusBar style = "light" />
            <Image 
             source={{
                 uri: 'https://img.icons8.com/clouds/100/000000/teamspeak-new-logo.png',
             }}
             style ={{width :210 , height : 210}}
            />
            <View style={styles.inputCon}>
                <Input placeholder = "Email" 
                       autoFocus 
                       type="email" 
                       value={email}
                       onChangeText={(text) => setEmail(text)}/>
                <Input placeholder = "password" 
                       secureTextEntry 
                       type="password" 
                       value={password}
                       onChangeText={(text) => setPassword(text)}
                       onSubmitEditing={signIn}
                       />

                <Button title="login" containerStyle={styles.button}  onPress={signIn}  />
                <Button title="Register" containerStyle={styles.button} type="outline"
                onPress={() => navigation.navigate('Register')}
                />
                <View style ={{width: 100}} />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputCon:{
        width : 300,
    },
    button:{
        width : 200,
        marginLeft : 40,
        marginTop :10,
    },
    container:{
        flex:1 ,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "white",

    }
});

export default LoginScreen;