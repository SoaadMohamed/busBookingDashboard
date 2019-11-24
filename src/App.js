import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.scss';
import { StoreProvider } from "./store";

import TripInfo from './containers/TripInfo';
import TripStatus from './components/TripStatus';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="main-app">
          <Switch>
            <Route exact path='/' component={TripInfo} />
            <Route path='/status/' component={TripStatus} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
