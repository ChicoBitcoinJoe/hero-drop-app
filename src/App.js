import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import useMagicUser from './services/Magic';
import useDocumentTitle from './hooks/useDocumentTitle';
import Campaign from './routes/Campaign';
import Sandbox from './routes/Sandbox';

import './App.css';

const customMuiTheme = createMuiTheme({ palette: { type: "dark" }});

function App() {

  useDocumentTitle("Hero Drop");
  const User = useMagicUser();

  return (
    <MuiThemeProvider theme={customMuiTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/hero-drop-app/sandbox" render={(props) => <Sandbox {...props} User={User} />} />
          <Route exact path="/hero-drop-app/:campaignId" render={(props) => <Campaign {...props} User={User} />} />
          <Route render={() => <Redirect to="/hero-drop-app/sandbox" />} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
