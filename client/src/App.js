import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signuppage from "./pages/Signuppage";
import Loginpage from './pages/Loginpage'
import Homepage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import Infopage from "./pages/Infopage";
import Tradepage from "./pages/Tradepage";
import Container from "./components/Container";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signup from './components/Signup'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import { AuthProvider } from './contexts/AuthContext'
import UserFormContainer from './components/UserFormContainer'
import PrivateRoute from './PrivateRoute'
import GetFakeDate from './components/GetFakeDate'
import FakeCurrentTimeContext from './contexts/FakeCurrentTimeContext'

function App() {

  const [fakeCurrentTime, setFakeCurrentTime] = useState("");
  useEffect(() => {
    setFakeCurrentTime(GetFakeDate().toString());
    // console.log(GetFakeDate().toString())
  }, [])

  useEffect(() => {
    const intervalFakeTime = setInterval(() => {
      currentFakeTime();
    }, 1000)
    return () => clearInterval(intervalFakeTime);
  }, [fakeCurrentTime])

  function currentFakeTime() {
    // console.log(GetFakeDate().toString())
    setFakeCurrentTime((new Date(Date.parse(fakeCurrentTime) + 1000)).toString());
    
  }

  return (
    <Router>
      <AuthProvider>
        <FakeCurrentTimeContext.Provider value={fakeCurrentTime}>
      <div style={{zIndex:10, fontSize:"11px", color:"white", textAlign:"right", paddingRight:"25px", position:"fixed", top: 70, right:0}}>
        {fakeCurrentTime.substring(0,25)}
        </div>  
        <Container>
          <Nav />          
         <Switch>
            <Route exact path="/gamestock/" component={Homepage} />
            <Route exact path="/gamestock/signup" >
              <UserFormContainer>
                <Signup />
              </UserFormContainer>
            </Route>
            <Route exact path="/gamestock/login" >
              <UserFormContainer>
                <Login />
              </UserFormContainer>
            </Route>
            <Route exact path="/gamestock/forgot-password" >
              <UserFormContainer>
                <ForgotPassword />
              </UserFormContainer>
            </Route>
            {/* <Route exact path="/gamestock/login" component={Login} />
          <Route exact path="/gamestock/forgot-password" component={ForgotPassword} /> */}
            <PrivateRoute exact path="/gamestock/user" component={Userpage} />
            <PrivateRoute exact path="/gamestock/trade" component={Tradepage} />
            <PrivateRoute exact path="/gamestock/search" component={Infopage} />
            {/* create 404 page */}
          </Switch>
          <Footer />
        </Container>
        </FakeCurrentTimeContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
