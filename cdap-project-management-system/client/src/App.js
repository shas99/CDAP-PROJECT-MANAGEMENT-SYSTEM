import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () =>{
  return (
    <Router>
      <div className="app">
        <h1>me</h1>
        
        <Routes>
          <Route path='/login' element={<LoginScreen/>} exact/>
          <Route path='/register'element={<RegisterScreen/>} exact/>
          <Route path='/forgotpassword' element={<ForgotPasswordScreen/>}exact/>
         

        </Routes>
      </div>
    </Router>
  )
}
export default App;
