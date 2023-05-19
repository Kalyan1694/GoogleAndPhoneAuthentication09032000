import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const signInWithGoogle = async () => {
    try{
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: "886383792467-bdt2bkj7n93lf9m5ur8spipvki08g0ga.apps.googleusercontent.com",
            scopes: ['profile', 'email']
        })
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const {idToken} = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredentials);
        return userInfo;
    }
    catch(error){
        console.log("Google SignIn error")
        return null
    }
}

