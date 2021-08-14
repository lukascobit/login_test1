import React, { useRef } from 'react'

function Signup() {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  return (
    <div>
      
      <h1>sign up</h1>
      <form action="">
        <input placeholder="email" ref={emailRef} type="email" />
        <input placeholder="password" ref={passwordRef} type="password" />
        <input placeholder="confirm password" ref={passwordConfirmRef} type="password" />
        <button className="signButton">sign up</button>
      </form>
    </div>
  )
}

export default Signup
