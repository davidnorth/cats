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

         <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/upload">Upload a cat</Link>
            </li>
          </ul>
        </nav>

      </header>

      <Switch>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </div>
    </Router>
  );
}

export default App;
