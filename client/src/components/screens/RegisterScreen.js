import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import PasswordChecklist from "react-password-checklist"

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    
    
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
//push to private screen
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  
  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name" className="inputs"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email" className="inputs"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password" className="inputs"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword" className="inputs"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
                
        {/* Pasindu Vinod added password validation for reset password component on 17/04/2022 */}
        <PasswordChecklist
        className ="message"
				rules={["minLength","specialChar","number","capital","lowercase","match"]}
				minLength={8}
				value={password}
				valueAgain={confirmpassword}
        iconSize={10}
				messages={{
					minLength: "Password must include atleast 8 characters.",
					specialChar: "Password must include atleast 1 special character.",
					number: "Password must include atleast 1 number.",
					capital: "Password must include atleast 1 capital letter.",
          lowercase: "Password must include atleast 1 lowercase letter.",
          match: "New Password and Confirm New Password fields must be same."
				}}
        />

        <button type="submit" className="btn btn-success" id="btn">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
