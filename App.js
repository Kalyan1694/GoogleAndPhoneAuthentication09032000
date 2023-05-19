import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, LogBox } from "react-native"
import Otp from "./phone";
import { signInWithGoogle } from "./src/config/firebase/GoogleSignIn";

export default function App(){
  LogBox.ignoreAllLogs();
  async function googleSignIn(){
    signInWithGoogle().then(data => {
      if(!data){
        console.log("Error No Data")
        return
      }
      console.log("Success")
      Alert.alert("App", "Welcome to our App")
    })
  }

  const [gclick, setGclick] = useState(false)
  const [pclick, setPclick] = useState(false)

  const gClickHandler=()=>{
    setGclick(prevState=>!prevState);
    if(pclick){
      setPclick(false)
    }
  }

  const pClickHandler=()=>{
    setPclick(prevState=>!prevState);
    if(gclick){
      setGclick(false)
    }
  }

  const OnOTPRequestButtonClick = () => {}

  const ButtonClickHandler = () => {
    if(gclick){
      return(
        <View style={styles.gContainer}>
          <TouchableOpacity onPress={()=>googleSignIn()}>
            <Image style={styles.gImage} source={require("./icons8-google-480.png")}/>
          </TouchableOpacity>
        </View>
      )
    }
    else if(pclick){
      return(
        <Otp/>
      )
    }
  }

  return(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require("./download.jpg")}/>
        </View>
        <View style={styles.loginMethodsContainer}>
          <View>
            <Text style={gclick? [styles.button, styles.googleLogin, styles.changedText] : [styles.button, styles.googleLogin]} onPress={gClickHandler}>Login With Google</Text>
          </View>
          <View>
            <Text style={pclick? [styles.button, styles.phoneLogin, styles.changedText]: [styles.button, styles.phoneLogin]} onPress={pClickHandler}>Login With Phone</Text>
          </View>
        </View>
        <View style={styles.ButtonClickHandlerContainer}>
          <ButtonClickHandler/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 25
  },
  image:{
    height: 100,
    width: 100,
  },
  loginMethodsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    borderWidth: 2,
    borderColor: "pink",
    borderRadius: 10,
  },
  googleLogin:{
    marginRight: 10
  },
  changedText: {
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 10,
    backgroundColor: "black"
  },
  ButtonClickHandlerContainer: {
    padding: 25
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  gContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  pContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton:{
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "#5cb85c",
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
    borderRadius: 5,
    marginBottom: 25
  },
  gImage: {
    width:50,
    height: 50
  }
})


// {setTimeout = () => {
//   (
//   <View>
//     <Text>OTP</Text>
//     <TextInput style={styles.input} placeholder="Enter OTP"/>
//   </View>
  
// ), 5000}}