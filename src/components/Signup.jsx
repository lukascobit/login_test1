import React, { useRef, useState } from 'react'
import { useAuth } from '../context/authContext'


function Signup() {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup} = useAuth()
  console.log(signup);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError("Passwords dont match")
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <div>
      
      <h1>sign up</h1>
      <form onSubmit={e => onSubmit(e)} action="">
        <input placeholder="email" ref={emailRef} type="email" />
        <input placeholder="password" ref={passwordRef} type="password" />
        <input placeholder="confirm password" ref={passwordConfirmRef} type="password" />
        <button disabled={loading} className="signButton">sign up</button>
        <h1>{error}</h1>
        <h1>{loading ? "loading..." :  ""}</h1>
      </form>
    </div>
  )
}

export default Signup
