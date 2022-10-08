import React, {useState} from 'react'
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import apiRequest from "../../helper/api";

const Signup = () => {
     let navigate = useNavigate();
     let [username, setUsername] = useState();
     let [password, setPassword] = useState();
     let [confirmPassword, setConfirmPass] = useState();
     let [error, setError] = useState();

  return (
     <div className='login-backdrop'>
     <div className="login">
       <h1 className='login-heading'>Create your Own Account</h1>
       {error ? <h2 className="error">{error}</h2> : <></>}
       <div className="center-children column">
       <div className='login-container'>
         <label>Username</label>
         <input type='text' placeholder='username' className='login-input--username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
       </div>
       <div className='login-container'>
        <label>Password</label>
        <input type='text' placeholder='password' className='login-input--password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
       </div>
       <div className='login-container'>
        <label>Confirm Password</label>
        <input type='text' placeholder='password' className='login-input--password' value={confirmPassword} onChange={(e)=>{setConfirmPass(e.target.value)}}/>
       </div>
       </div>
       <button onClick={function (){
         if(password == confirmPassword){
          apiRequest({
            route: "signup",
            method: "POST",
            body:{
              username: username,
              password: password
            },
            onReturn:(data)=>{
             if(data.affectedRows == 1){
               localStorage.setItem(
                 "user_id", data.insertId
               );
               navigate("/teams");
             }else{
               setError(data.message);
             }
             
            }
          });
         }else{
           setError("Passwords must match");
         }
       }}>Sign Up</button>
       <div>
         or
       <Link className="signup-link" to="/">Log In</Link>
       </div>
     </div> 
    </div>
  )
}

export default Signup