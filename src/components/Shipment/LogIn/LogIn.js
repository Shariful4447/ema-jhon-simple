

import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";
import { UserContext } from '../../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, signInUser, handleFacebookSignIn, handleGoogleSignIn, handleSignout, initializeLogInFrameWork } from "./loginManager";
//import { FacebookAuthProvider } from "firebase/auth";





function LogIn() 
{
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
        const from  =location.state || { from :{pathname : "/"}};

        
        const googleSignIn=()=>{
          handleGoogleSignIn()
          .then(res => {
            setUser(res);
            setLoggedInUser(res);
            navigate(from, {replace: true})
          })
        }

        const signOut = ()=>{
          handleSignout()
          .then(res=>{
            setUser(res);
            setLoggedInUser(res);

          })
        }

        const facebookSignIn =()=>{
          handleFacebookSignIn();
        }
  
  

        initializeLogInFrameWork();




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
          if (isFildValid){
            
            const newUserInfo={...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);


            
          }
        }

          const handleSubmit = (e) => {
            if (newUser && user.email && user.password){
              //const auth =getAuth();
              createUser(user.name, user.email, user.password)
              .then(res => {
                setUser(res);
                setLoggedInUser(res);
                navigate('/Shipment', {replace: true});

              })

            }
            
          
    
            if(!newUser && user.email && user.password){
              //const auth = getAuth();
              signInUser(user.email, user.password)
              .then(res => {
                setUser(res);
                setLoggedInUser(res);
                navigate('/Shipment', {replace: true});
              });



            }
              e.preventDefault();
  

          }





  return (
    <div className="App">
      {
        user.isSignedIn? <button onClick={signOut}>Sign Out :</button> :
        <button onClick={googleSignIn}>Sign In :</button>
        
      }
      <br />

      {
          <button onClick={facebookSignIn}> SignInFacebook</button>
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
