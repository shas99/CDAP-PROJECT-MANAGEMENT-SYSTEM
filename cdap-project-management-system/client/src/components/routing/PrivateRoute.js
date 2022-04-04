/*import { Navigate, Route } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>{
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }}
    />
  );
};

export default PrivateRoute;*/

import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

/*
function PrivateRoute({ children, ...rest}) {
    return (
        <Route {...rest}
        render={({ props }) => localStorage.getItem("AuthToken") ? (
            children
        ):(
            <Redirect to={{pathname:"/login"}}/>

            
        )}/>
    )
}
 export default PrivateRoute;*/