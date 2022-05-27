import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";


const ViewGroup = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logged,setlogged] = useState("")
  const [email, setEmail] = useState("");
  const [member1,setmember1] = useState("hello")
  const [member2,setmember2] = useState("")
  const [member3,setmember3] = useState("")
  const [member4,setmember4] = useState("")
  const [member5,setmember5] = useState("")
  useEffect(() => {
    const resetPasswordHandler = async (e) => {


      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
  
  
      try {
       
        const { data } = await axios.get(
          `/api/group/viewgroup/${match.params.id}`,
          {
  
          },
          config
        );
          setmember1(data.data.member_1)
          setmember2(data.data.member_2)
          setmember3(data.data.member_2)
          setmember4(data.data.member_4)
          setmember5(data.data.member_5)
  
        console.log(data);
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    resetPasswordHandler()
  }, [history]);






  return (
    <div className="resetpassword-screen">

      Group members<br/>
      {member1}<br/>
      {member2}<br/>
      {member3}<br/>
      {member4}<br/>
      {member5}
 
    </div>
  );
};



export default ViewGroup;
