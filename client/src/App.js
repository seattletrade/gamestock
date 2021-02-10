import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import Infopage from "./pages/Infopage";
import Tradepage from "./pages/Tradepage";
import Container from "./components/Container";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <>
        <Container>
          <Nav />
          <Route exact path="/gamestock/" component={Homepage} />
          <Route exact path="/gamestock/login" component={Authpage} />
          <Route exact path="/gamestock/user" component={Userpage} />
          <Route exact path="/gamestock/trade" component={Tradepage} />
          <Route exact path="/gamestock/search" component={Infopage} />
          {/* create 404 page */}
          <Footer />
        </Container>
      </>
    </Router>
  );
}

export default App;
