import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";


const GroupConfirm = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logged,setlogged] = useState("")
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setlogged("Logged")
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      setlogged("Logged")
      localStorage.setItem("authToken", data.token);
      

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };



  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };



    try {
      const token = localStorage.getItem("authToken")
      const { data } = await axios.put(
        `/api/group/groupconfirm/${match.params.resetToken}`,
        {
          password,
          token
        },
        config
      );

      const { data1 } = await axios.put(
        `/api/group/autoapprove/${match.params.resetToken}`,
        {
          password,
        },
        config
      );
      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      {logged == "Logged" &&
      <div>
       
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Group Registration confirmation<br/><br/>Click button below to confirm your registration</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success}
          </span>
        )}
        
        <button type="submit" className="btn btn-primary" id="btn">
          Join Group
        </button>
      </form>
      </div>
      }
      {logged == "" && 
            <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form">
              <h3 className="login-screen__title">Login</h3>
              {error && <span className="error-message">{error}</span>}
              <div className="form-group">
                <label htmlFor="email" id="EmailID">Email:</label>
                <input
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
              <button type="submit" className="btn btn-primary" id="LogButton">
                Login
              </button>
      
              <span className="login-screen__subtext">
                Don't have an account? <Link to="/register" id="Regs">Register</Link>
              </span>
            </form>
          </div>
      }
    </div>
  );
};



export default GroupConfirm;
