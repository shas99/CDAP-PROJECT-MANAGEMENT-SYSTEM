import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";


const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logged,setlogged] = useState("")
  const [OTPnum,setOTP] = useState("")
  const [inputOTP,setinputOTP] = useState("")
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {



  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        "/api/auth/login",
        { email, password },
        config
        );
        setlogged("Logged")
        console.log(logged)
      // localStorage.setItem("authToken", data.token);

      // history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

const setOTPnum =(inputOTP)=> {

  setOTP(inputOTP)


}


  const OTPHandler = async (e) => {
    e.preventDefault();
    console.log(inputOTP+"input")
    setOTPnum(inputOTP)
    console.log(OTPnum+"OTPnum")
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.put(
        "/api/auth/OTP",
        { email, password, OTPnum},
        config
      );
        // setlogged("Logged")
      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      {console.log(logged)}
      {logged == "" && 
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email" id="EmailID">Email:</label>
          <input
          style={{color:"black"}}
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" id="PasswordID">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
          style={{color:"black"}}
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="" id="Log1Button">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register" id="Regs">Register</Link>
        </span>
      </form>
}

{/* 2-factor auth */}
{logged == "Logged" && 

<div>
       
<form
  onSubmit={OTPHandler}
  className="resetpassword-screen__form"
>
  <h3 className="resetpassword-screen__title">Group Registration confirmation<br/><br/>Click button below to confirm your registration</h3>
  <input
          style={{color:"black"}}
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setinputOTP(e.target.value)}
            value={inputOTP}

          />
  
  <button type="submit" className="btn btn-primary" id="btn">
    Login
  </button>
</form>
</div>




}
    </div>
  );
};

export default LoginScreen;
