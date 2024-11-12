import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    let email = useRef();
    let password = useRef();
    let naviaget = useNavigate()

    let login=(e)=>{
        e.preventDefault();
        let m = email.current.value
        
        let ps = password.current.value

        let obj={
          mail : "manoj@gmail.com",
          password:"1234567"
        }
        if(m === obj.mail && ps === obj.password){
            naviaget(`/home`)
            
        }
       
    }
  return (
    <div>
        <h1 >LoginPage</h1>
       <form action="" onSubmit={login} className='form'>
        <input type="text" placeholder='enter email' ref={email}/>
        <input type="password" placeholder='enter password' ref={password}/>
        <button>Submit</button>
       </form>
    </div>
  )
}

export default Login
