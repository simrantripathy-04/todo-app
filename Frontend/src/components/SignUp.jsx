import { useEffect } from 'react';
import { useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';

 
 export function SignUp(){
   const[userData,setUserData]=useState() 
   const navigate = useNavigate()

   useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')   
    }
   })

   const handleSignUp=async()=>{
    console.log(userData);
    
    let result = await fetch('http://localhost:3200/Signup',{
       method:"post",
       body:JSON.stringify(userData),
       headers:{
        'Content-Type':'application/json'
       }
     })
     result=await result.json()
     if(result.success){
       console.log(result);
       document.cookie="token="+result.token
       localStorage.setItem('login',userData.email)
       window.dispatchEvent(new Event('localStorage-change'))
       navigate('/')   
        
     }else{
      alert("Try After Sometime")
     }
}
        
    return(
        <div className="container">
            <h1>Sign Up</h1>
          
                <label htmlFor="">Name</label>
                <input
                 onChange={(e)=>setUserData({...userData,name:e.target.value})} 
                 
                 type="text" name="name" placeholder="Enter user name"></input>
                
                <label htmlFor="">Email</label>
                <input 
                onChange={(e)=>setUserData({...userData,email:e.target.value})} 
                
                type="text" name="email" placeholder="Enter user email"></input>
                
                <label htmlFor="">Password</label>
                <input  
                onChange={(e)=>setUserData({...userData,password:e.target.value})} 
                
                type="password" name="password" placeholder="Enter user password"></input>
                
                <button onClick={handleSignUp }  className="submit">Sign Up</button>
                <Link  className='link' to="/login">Login</Link>
         
        </div>
    )
}