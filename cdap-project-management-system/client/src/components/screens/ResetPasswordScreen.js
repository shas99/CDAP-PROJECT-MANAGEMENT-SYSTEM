import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './ForgotPasswordScreen.css'

const ResetPasswordScreen =({ history, match})=>{
  const [password,setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]=useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header:{
        "Content-Type":"application/json",
      }
    }
    if(password !== confirmPassword){
      setPassword("");
      setConfirmPassword("");
      setTimeout(()=>{
        setError("");
      },5000);
      return setError("Passwords do not match");
    }
    try{
      const {data}= await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      )
      console.log(data);
      setSuccess(data.data);
    }catch(error){
      setError(error.response.data.error);
      setTimeout(()=>{
        setError("");

      },5000)
    }
  }
  return (
    <div className="reset-password-screen">
      <form
      onSubmit={resetPasswordHandler}
      className="resetpassword-screen__form">
        <h3 className="resetpassword-screen__title">Forgot password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && (
          <span className="success-message">
            {success}<Link to ="/login">Login</Link>
          </span>
        )}

        <div className="form-group">
          <label className="password">New password</label>
          <input type="password"
          required
          id="password"
          placeholder="Enter new password"
          autoComplete="true"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm new password: </label>
          <input
          type="password"
          required
          id="confirmpassword"
          placeholder="Confirm new password"
          autoComplete="true"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Reset password
          </button>

        </div>
      </form>
    </div>
  )

}
export default ResetPasswordScreen;