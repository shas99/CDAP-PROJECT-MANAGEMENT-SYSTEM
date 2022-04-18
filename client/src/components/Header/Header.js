import React, { useEffect } from 'react';
import './Header.css';





const Header = ({history}) => {
  
  
  
  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  
  return   ( 

  <div class="header">
  <a href="/" class="logo">Calibre</a>
  <div class="header-right">
  <a class="active" href="#home">Home</a>
  <a href="#portal">Portal</a>
  {/* <button onClick={logOutHandler} id="logout">Log Out</button> */}
 </div>
</div>
   
  );
};

export default Header;







