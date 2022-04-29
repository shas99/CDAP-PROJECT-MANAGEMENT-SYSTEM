import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"//password validation



const GroupConfirm = ({ history, match }) => {
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



    try {
      const { data } = await axios.put(
        `/api/group/groupconfirm/${match.params.resetToken}`,
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
  );
};



export default GroupConfirm;
