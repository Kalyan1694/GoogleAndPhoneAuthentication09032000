import { View, Text, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../config'
import firebase from 'firebase/compat'

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const recaptchaVerifier = useRef(null)

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      setPhoneNumber('');
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
      setCode('');
    })
    .catch((error) => {
      Alert.alert("Error", "Something went wrong");
    })
    Alert.alert("Success", "Successful Login");
  }

  return (
    <View style={styles.pContainer}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View>
        <Text>Phone Number</Text>
        <TextInput style={styles.input} onChangeText={setPhoneNumber} keyboardType='phone-pad' autoCompleteType='tel' placeholder="Enter your Phone Number with country code"/>
      </View>
      <TouchableOpacity onPress={sendVerification}>
        <Text style={styles.submitButton}>Request OTP</Text>
      </TouchableOpacity>
      <View>
        <Text>Enter OTP</Text>
        <TextInput style={styles.input} onChangeText={setCode} placeholder="Enter OTP" keyboardType='number-pad'/>
      </View>
      <TouchableOpacity  onPress={confirmCode}>
        <Text style={styles.submitButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    padding: 10,
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
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
})

export default Otp