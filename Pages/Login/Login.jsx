import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import apiRequest from "../../helper/api";


const Login = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState();

  return (
    <div className='login-backdrop'>
     <div className="login">
       <h1 className='login-heading'>Login to your Account</h1>
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
       </div>
       <button onClick={function (){
         apiRequest({
           route: "login",
           method: "POST",
           body:{
             username: username,
             password: password
           },
           onReturn:(data)=>{
            if(data.success){
              localStorage.setItem(
                "user_id", data.user_id
              );
              navigate("/teams");
            }else{
              setError(data.message);
            }
            
           }
         });
       }}>Login</button>
       <div>
         or
       <Link className="signup-link" to="/signup">Sign up</Link>
       </div>
     </div> 
    </div>
  )
}


export default Login