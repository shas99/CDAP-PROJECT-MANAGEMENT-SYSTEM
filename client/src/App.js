import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// //Header
// import Header from "./components/Header/Header";

// //Footer
// import Footer from "./components/Footer/Footer";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ViewFeedback from "./components/screens/ViewFeedback";
import GroupConfiguration from "./components/screens/GroupConfiguration";
import ViewMarks from "./components/screens/ViewMarks";
import MatchedSupervisors from "./components/screens/MatchedSupervisors";
import GroupScreen from "./components/screens/GroupScreen"

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          <Route exact path="/viewfeedback" component={ViewFeedback} />
         <Route exact path="/viewmarks" component={ViewMarks}/>
         <Route exact path="/matchedsupervisors" component={MatchedSupervisors}/>

         <Route exact path="/GroupScreen" component={GroupScreen}/>

         <Route exact path="/groupconfiguration" component={GroupConfiguration}/>

        </Switch>

      </div>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
