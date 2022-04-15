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

    // const pw = password;
    // var check = Object.assign([], pw);
    // var l = check.length;
    // //var n = [];
    
    // // for (var i = 0; i <= l; i++){
    //   var k = check.charCodeAt();
    //   //n[i] = k;
      
    // //}
    // console.log(n);

    // //Password length check
    // if (check.length < 8){
    //   return setError("Password is too short");
    // }
  
    
    
    // for(let i = 0; i <= check.length; i++){
    //   var k = check[i].charCodeAt(i);
    //   console.log(check[i]);
    //   if (k >= 48 && k <= 57){
    //     var numberTrue = 1;
    //     console.log("numberTrue");
    //     return numberTrue;
    //   }
    //   if (k >= 65 && k <= 90){
    //     var uppercaseTrue = 1;
    //     console.log("uppercaseTrue");
    //     return uppercaseTrue;
    //   }
    //   if (97 >= 0 && k <= 122){
    //     var lowercaseTrue = 1;
    //     console.log("lowercaseTrue");
    //     return lowercaseTrue;
    //   }
    //   if ((k >= 33 && k <= 47) || (k >= 58 && k <= 64) || (k >= 91 && k <= 96) || (k >= 123 && k <= 126)){
    //     var scTrue = 1;
    //     console.log("scTrue");
    //     return scTrue;
    //   }
    // }

    // for (let i = 0; i <= check.length;i++){
    //   var item = check[i];
    //   console.log(item);
    //   var k = check[i].charCodeAt(i);
    //   console.log(k);
    //   // if (k >= 48 && k <= 57){
    //   //   var numberTrue = 1;
    //   //   console.log(numberTrue);
    //   //   return numberTrue;
    //   // }
    // }

    //Password character check
    // if (numberTrue !== 1){
    //   return setError("Password must include 'Numeric' character");
    // }
    // if (uppercaseTrue !== 1){
    //   return setError("Password must include 'Uppercase' character");
    // }
    // if (lowercaseTrue !== 1){
    //   return setError("Password must include 'Lowercase' character");
    // }
    // if (scTrue !== 1){
    //   return setError("Password must include 'Special' character");
    // }

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
        <PasswordChecklist
        className ="message"
				rules={["minLength","specialChar","number","capital","lowercase"]}
				minLength={8}
				value={password}
				valueAgain={confirmpassword}
        iconSize={10}
				messages={{
					minLength: "Password must include atleast 8 characters.",
					specialChar: "Password must include atleast 1 special character.",
					number: "Password must include atleast 1 number.",
					capital: "Password must include atleast 1 capital letter.",
          lowercase: "Password must include atleast 1 lowercase letter."
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
