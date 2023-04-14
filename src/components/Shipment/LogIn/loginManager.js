import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { sendPasswordResetEmail, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from 'firebase/auth';




export const initializeLogInFrameWork = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
     
    const googleProvider = new GoogleAuthProvider(); 
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
    .then((res) => {
     const {displayName, photoURL, email} = res.user;
     const signedInuser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
      success:true
    }
    return signedInuser;
  })
    .catch((err)=>{
    console.log(err);
    console.log(err.message);
    
  })
}


export const handleFacebookSignIn = ()=> {
    //const fbAuthProvider = new FacebookAuthProvider();
   
    // const auth = getAuth();
    // signInWithPopup(auth, fbAuthProvider)
    //   .then((result) => {
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log('Fb User After Sign In :',user);
  
    
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     // const credential = FacebookAuthProvider.credentialFromResult(result);
    //     // const accessToken = credential.accessToken;
        
    
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode,errorMessage);
    //     // The email of the user's account used.
    //     // const email = error.customData.email;
    //     // // The AuthCredential type that was used.
    //     // const credential = FacebookAuthProvider.credentialFromError(error);
    
    //     // ...
    //   });
  }

  export const handleSignout = () => {
    return firebase.auth().signOut()
    .then(res=>{
      const signedOutuser = {isSignedIn:false,
        name: "",
        photo:"",
        password:"",
        email:"",
        error:"",
        success:false
      }
      return signedOutuser;
    
    })
  .catch(err=>{
  
  })
  }

  
  export const createUser = (name, email, password)=> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const newUserInfo=res.user;
        newUserInfo.error = '';
        newUserInfo.success=true;
        updateUserName(name);
        verifyEmail();
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo={};
        newUserInfo.error = error.message;
        console.log(error, error.message);
        newUserInfo.success= false;
        return newUserInfo;
        

        
       
        // ..
      });

  }


  export const signInUser =(email, password)=>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      
      .then(res => {
          const newUserInfo=res.user;
          newUserInfo.error = '';
          newUserInfo.success=true;
          return newUserInfo;
          //navigate('/Shipment', {replace: true});
          //console.log('Sign In Succesfully', res.user);
      })
      
      .catch(error => {
        const newUserInfo={};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
       return newUserInfo;
        
       
        // ..
      });
  }


  const updateUserName = name => {
    var auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
      
    }).then(() => {
      // Profile updated!
      console.log('Profile Name updated');
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(error);
      // ...
    });
}

const verifyEmail = () =>{
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      console.log('Email verification sent!');
      // ...
    });
}

export const resetPassword = (email) =>{
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('Password reset email sent!');
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console(errorMessage + errorCode);
    // ..
  });
}

  
