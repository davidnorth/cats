import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
    <div className="App">


      <header className="App-header">
        <Link to="/"><img alt="Rate my cats!" src="/logo.png" id="logo" /></Link>
      </header>

      <section id="main">
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch> 
      </section>

    </div>
    </Router>
  );
}

export default App;
