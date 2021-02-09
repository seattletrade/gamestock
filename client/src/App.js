import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
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
          <Route exact path="/gamestock/" component={Authpage} />
          <Route exact path="/gamestock/home" component={Homepage} />
          <Route exact path="/gamestock/trade" component={Tradepage} />
          <Route path="/gamestock/info" component={Infopage} />
          <Footer />
        </Container>
      </>
    </Router>
  );
}

export default App;
