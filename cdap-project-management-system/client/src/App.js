
//routing
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//original private route

//screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

//original code

const App = () =>{
  return (
    <Router>
      <div className="app">
        
        
        <Routes>
          
        <Route path="/"element={<PrivateRoute><PrivateScreen/></PrivateRoute>}/>
          <Route path="/login"element={<LoginScreen/>} exact/>
          <Route path="/register"element={<RegisterScreen/>} exact/> 
          <Route path="/forgotpassword"element={<ForgotPasswordScreen/>}exact/>
          <Route path="/passwordreset/:resetToken"element={<ResetPasswordScreen/>}exact/>
         

        </Routes>
      </div>
    </Router>
  )
}
export default App;





