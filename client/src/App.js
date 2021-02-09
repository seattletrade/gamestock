import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import Searchpage from "./pages/Searchpage";
import Infopage from "./pages/Infopage";
import Tradepage from "./pages/Tradepage";
import Container from "./components/Container/index";
import Nav from "./components/Nav/index";
import Footer from "./components/Footer/index";


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
          <Route exact path="/gamestock/search" component={Searchpage} />
          <Route exact path="/gamestock/info" component={Infopage} />
          {/* create 404 page */}
          <Footer />
        </Container>
      </>
    </Router>
  );
}

export default App;
