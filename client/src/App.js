import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// //Header
// import Header from "./components/Header/Header";

// //Footer
// import Footer from "./components/Footer/Footer";

import SideNavigationBar from "./components/screens/SideNavigationBar";
import Dashboard from './components/screens/Dashboard'

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
import GroupConfirm from "./components/screens/GroupConfirm";
import TopicRegistration from "./components/screens/StudentTopicRegistrationForm";
import StaffLoginScreen from "./components/screens/StaffLoginScreen";
import StaffRegisterScreen from "./components/screens/StaffRegisterScreen";
import StaffDashboard from "./components/screens/StaffDashboardNew";
import StaffRecommendationForm from "./components/screens/StaffRecommendationForm";//Staff Recommendation Form
import ProposalPresentationMarks from "./components/screens/ProposalPresentationMarks";

import ViewMarksDashboard from "./components/screens/ViewMarksDashboard";

//Progress Presentation Marks 1 
import EnterProgressPresentation1Marks from "./components/screens/EnterProgressPresentation1Marks";

import ProposalReportMarks from "./components/screens/ProposalReportMarks";

import ViewProposalPresentationMarks from "./components/screens/ViewProposalPresentationMarks";

import ViewProgressPresentation1Marks from "./components/screens/ViewProgressPresentation1Marks";
//styling trial

import ViewProposalReportMarks from "./components/screens/ViewProposalReportMarks";

import ViewStatusDocument1Marks from "./components/screens/ViewStatusDocument1Marks";

import EnterStatusDocument1Marks from "./components/screens/EnterStatusDocument1Marks"


import ViewAvailableProjects from "./components/screens/ViewAvailableProjects";
import ProjectBidding from "./components/screens/ProjectBidding";
//import Submission from "./components/screens/SubmissionScreen";
import StaffReport from "./components/screens/StaffReportScreen"
import ViewAvailableProjectsStaff from "./components/screens/StaffAvailableProject";
import OPT from "./components/screens/OTPScreen";

import StudentTopicInterestingForm from "./components/screens/StudentTopicInterestingForm";
import SubmissionMilestones from "./components/screens/SubmissionMilestones";
import Submission from "./components/screens/Submission";

import ViewGroup from "./components/screens/StaffviewGroup";


//import StaffDashboard  from "./components/screens/StaffDashboard";
import login  from "./components/screens/login";
//mark dashboard
import MarkDashboard from "./components/screens/MarkDashboard";

import AdminLoginScreen from "./components/screens/AdminLoginScreen"

import AdminDashboard from "./components/screens/AdminDashboardScreen";
import AdminViewAvailableProjects from "./components/screens/AdminViewAvailableProjects";
import AdminAvailableProjectGroups from "./components/screens/AdminAvailableProjectGroups";

import SubmissionAdmin from "./components/screens/SubmissionAdminScreen"
import AddSubmission from "./components/screens/AddSubmissionScreen"
import EditSubmission from "./components/screens/EditSubmissions"

import MarkingConfigurationsDashboard from "./components/screens/MarkingConfigurationsDashboard";
import ProposalMarkingConfiguraton from "./components/screens/ProposalMarkingConfiguraton";

import ProposalReportMarkingConfiguration from "./components/screens/ProposalReportMarkingConfiguration";
import StatusDocumentMarkingConfiguration from "./components/screens/StatusDocumentMarkingConfiguration";

import UserProfile from "./components/screens/UserProfile";
import EditUserProfile from "./components/screens/EditUserProfile";
import ProgressPresentationMarkingConfiguration from "./components/screens/ProgressPresentationMarkingConfiguration";
import PlaceAnnouncement from "./components/screens/PlaceAnnouncement";
import StaffPlaceAnnouncement from './components/screens/StaffPlaceAnnouncement';
import Status from './components/screens/StatusScreen';

import AdminViewGroup from './components/screens/AdminViewGroupScreen';
import AssignStaff from './components/screens/AssignStaffGroupScreen';

import CoordinatorViewAvailableProjects from "./components/screens/CoordinatorViewAvailableProjects";
import UpdateProjectDetails from "./components/screens/UpdateProjectDetails";
import CreateNewProject from "./components/screens/CreateNewProject";
import ViewStaffForm from "./components/screens/viewStaffFormScreen";
import PageNotFound from "./components/screens/PageNotFound";
import SupervisorViewBidding from "./components/screens/SupervisorViewBidding";
import ViewBiddingStaff from "./components/screens/ViewBiddingStaffScreen";
import StaffLoginExpiredScreen from "./components/screens/StaffExpiredLoginScreen";


const App = () => {
  return (
    <Router>
      {/* <Header /> */}
     

      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
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


         <Route exact path="/groupconfirm/:resetToken" component={GroupConfirm}/>

         <Route exact path="/topicregistration" component={TopicRegistration}/>

         <Route exact path="/stafflogin" component={StaffLoginScreen}/>
         
         <Route exact path="/staffRegister" component={StaffRegisterScreen}/>

          <Route exact path="/staffPrivate" component={StaffDashboard}/> 

          <Route exact path="/viewproposalpresentationmarks" component={ViewProposalPresentationMarks}/>

          <Route exact path="/viewproposalreportmarks" component={ViewProposalReportMarks}/>

          <Route exact path="/viewstatusdocument1marks" component={ViewStatusDocument1Marks}/>

          <Route exact path="/viewprogresspresentation1marks" component={ViewProgressPresentation1Marks}/>

          <Route exact path="/addproposalpresentationmarks" component={ProposalPresentationMarks}/>

          <Route exact path="/addproposalreportmarks" component={ProposalReportMarks}/>

          <Route exact path="/enterstatusdocument1marks" component={EnterStatusDocument1Marks}/>

          <Route exact path="/enterprogresspresentation1marks" component={EnterProgressPresentation1Marks}/>

          <Route exact path="/viewmarksdashboard" component={ViewMarksDashboard}/>
          <Route exact path="/staffviewgroup" component={ViewGroup}/>


         <Route exact path="/viewavailableprojects" component={ViewAvailableProjects}/>
         <Route exact path="/availableProjects/:id" component={ProjectBidding}/>
         
         <Route exact path="/viewgroup/:id" component={ViewGroup}/>

         <Route exact path="/submit" component={Submission}/>
         <Route exact path="/staffreport" component={StaffReport}/>
         <Route exact path="/staffproject" component={ViewAvailableProjectsStaff}/>

         {/* Student Topic Interestings */}
         <Route exact path="/studenttopicinterestingform" component={StudentTopicInterestingForm}/>

         {/* Staff Recommendation Form */}
         <Route exact path="/staffrecommendationform" component={StaffRecommendationForm}/>
         <Route exact path="/OPT" component={OPT}/>
         <Route exact path="/submissionmilestone" component={SubmissionMilestones}/>
         <Route exact path="/submission/:id" component={Submission}/>


         {/* <Route exact path="/staffdashboard" component={StaffDashboard}/> */}

         <Route exact path="/markdashboard" component={MarkDashboard}/>

         <Route exact path="/adminLogin" component={AdminLoginScreen}/>

         <Route exact path="/adminPrivate" component={AdminDashboard}/>

         <Route exact path="/adminViewProjects" component={AdminViewAvailableProjects}/>
         
         <Route exact path="/adminAvailableProjectGroups" component={AdminAvailableProjectGroups}/>
         <Route exact path="/markingconfiguations" component={MarkingConfigurationsDashboard}/>
         <Route exact path="/proposalmarkingconfiguration" component={ProposalMarkingConfiguraton}/>

         <Route exact path="/proposalreportmarkingconfiguration" component={ProposalReportMarkingConfiguration}/>
         <Route exact path="/statusdocumentmarkingconfiguration" component={StatusDocumentMarkingConfiguration}/>
         
         <Route exact path="/progresspresentationmarkingconfiguration" component={ProgressPresentationMarkingConfiguration}/>


         <Route exact path="/userprofile" component={UserProfile}/>
         <Route exact path="/edituserprofile/:id" component={EditUserProfile}/>
         <Route exact path="/sideNavBar" component={SideNavigationBar}/>
         <Route exact path="/dashboard" component={Dashboard}/>
         <Route exact path="/loginNew" component={login}/>
         <Route exact path="/placeAnnouncement" component={PlaceAnnouncement}/>
         <Route exact path="/staffPlaceAnnouncement" component={StaffPlaceAnnouncement}/>
         


         
         

         <Route exact path="/submissionadmin" component={SubmissionAdmin}/>

         <Route exact path="/addSubmission" component={AddSubmission}/>

         <Route exact path="/editSubmission/:id" component={EditSubmission}/>

         <Route exact path="/Status" component={Status}/>


         <Route exact path="/adminViewGroup/:id" component={AdminViewGroup}/>

         <Route exact path="/adminAssignStaff" component={AssignStaff}/>

         <Route exact path="/coordinatorViewProjects" component={CoordinatorViewAvailableProjects}/>
         <Route exact path="/updateProjectDetails/:id" component={UpdateProjectDetails}/>
          <Route exact path="/createNewProject" component={CreateNewProject}/>
          <Route exact path="/viewStaffForm/:id" component={ViewStaffForm}/>
          <Route exact path="/supervisorViewBidding" component={SupervisorViewBidding}/>

          <Route exact path="/ViewBidding/:id" component={ViewBiddingStaff}/>

         
          <Route exact path="/StaffLoginExpiredScreen/" component={StaffLoginExpiredScreen}/>


          

          {/* Routes added under this might not work. Please add your routes above this route           */}
          <Route path="*" component={PageNotFound}/>
        </Switch>

      </div>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
