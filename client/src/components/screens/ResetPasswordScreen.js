import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"//password validation

import "./ResetPasswordScreen.css";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
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
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        {/* Pasindu Vinod added password validation for reset password component on 16/04/2022 */}
        <PasswordChecklist
        className ="message"
				rules={["minLength","specialChar","number","capital","lowercase","match"]}
				minLength={8}
				value={password}
				valueAgain={confirmPassword}
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
        </div>
        <button type="submit" className="btn btn-primary" id="btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
