import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { UserContext } from '../../../App';
import { useLocation, useNavigate } from 'react-router-dom';
//import { FacebookAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC2DPzduAKL1OfHSk_D964P6NbPsjkvvP4",
  authDomain: "ema-jhon-simple-480d1.firebaseapp.com",
  projectId: "ema-jhon-simple-480d1",
  storageBucket: "ema-jhon-simple-480d1.appspot.com",
  messagingSenderId: "551084296857",
  appId: "1:551084296857:web:f90a99d00fde64157f4608"
};

firebase.initializeApp(firebaseConfig);

function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    
    name: "",
    email: "",
    photo:"",

  })

  //To navigate new page after login
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from :{pathname : "/"}};

  const googleProvider = new GoogleAuthProvider(); 
  //const fbAuthProvider = new FacebookAuthProvider();
 
  const handleSignin = () => {
     
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then((res) => {
     const {displayName, photoURL, email} = res.user;
     const signedInuser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(signedInuser);
    console.log(displayName, email, photoURL);
  })


  .catch((err)=>{
    console.log(err);
    console.log(err.message);
  })
}

const handleFacebookSignIn = ()=> {
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

const handleSignout = () => {
  firebase.auth().signOut()
  .then(res=>{
    const signedOutuser = {isSignedIn:false,
      name: "",
      photo:"",
      password:"",
      email:"",
      error:"",
      success:false
    }
    setUser(signedOutuser);
  
  
})
.catch(err=>{

})
}

const handleBlur = (e) => {
    let isFildValid = true;
    if (e.target.name === "email") {
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if (e.target.name === "password") {
      const isPasswordValid=e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);

      //const isFormValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
      isFildValid = isPasswordValid && passwordHasNumber;
    
    
    }
    if (isFildValid) {
      
      const newUserInfo={...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);


      
    }
}

const handleSubmit = (e) => {
  if (newUser && user.email && user.password){
   
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const newUserInfo={...user};
        newUserInfo.error = '';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo={...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
       setUser(newUserInfo);
        
       
        // ..
      });
    
  }
  if(!newUser && user.email && user.password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      
      .then((res) => {
          const newUserInfo={...user};
          newUserInfo.error = '';
          newUserInfo.success=true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate('/Shipment', {replace: true});
          console.log('Sign In Succesfully', res.user);
      })
      
      .catch((error) => {
        const newUserInfo={...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
       setUser(newUserInfo);
        
       
        // ..
      });
  }
  e.preventDefault();
  

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


  return (
    <div className="App">
      {
        user.isSignedIn? <button onClick={handleSignout}>Sign Out :</button> :
        <button onClick={handleSignin}>Sign In :</button>
        
      }
      <br />

      {
          <button onClick={handleFacebookSignIn}> SignInFacebook</button>
      }

      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} referrerPolicy="no-referrer" alt=""></img>
          </div>
      }
    
    <p>Our Authentication :</p>
    
    <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
    <label htmlFor="newUser">New User SignUP</label>
    <br />
    <form onSubmit={handleSubmit}>
    {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder='Your Name'/>}    
    <br />
    <input type="text" onBlur={handleBlur} name="email" placeholder='Write Your Email Address' required />
    <br />
    <input type="password" onBlur={handleBlur} name="password" id="" placeholder='Your Password' required/>
    <br />
    
    <input type="submit" value={newUser ? 'SignUp':'SignIn'} />
    </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'Created':'Logged In'} successfully</p>}

   
    </div>
  );
}

export default LogIn;
