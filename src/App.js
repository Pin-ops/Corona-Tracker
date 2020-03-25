import React from 'react';
import './App.css';
import NavBar from './components/Navbar'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CountrySearch from './components/CountrySearch';
import Page404 from './components/Page404';



function App() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={CountrySearch} />
          <Route component={Page404} />
        </Switch>
      </div>
    );
}

export default App;
