import React from 'react';
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from "@material-ui/core/Button";
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import useDocumentTitle from './hooks/useDocumentTitle';
import useMagic from './services/Magic';
import useSceneManager from './services/Scene';
import GameBoard from './components/gameboard/GameBoard';

import './App.css';
import 'react-contexify/dist/ReactContexify.min.css';
import defaultScene from './defaultScene';

const customMuiTheme = createMuiTheme({ palette: { type: "dark" }});

async function Server(storage, name) {
  let thread = await storage.joinThread(name,{ ghost: true});
  return {
    storage,
    thread,
    sync: (unsyncedData) => {
      thread.post(unsyncedData)
    },
    onUpdate: (fn) => thread.onUpdate(fn)
  };
}

function LoginButton({ handleLogin }) {
  
  const [anchorEl, setAnchorEl] = React.useState(React.createRef());
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    handleLogin(email);
    setOpen(false);
  };

  return <>
    <Button ref={anchorEl}
      style={{ backgroundColor: '#44975f', color: 'white', width: '97px' }} 
      size="large" variant="contained" 
      onClick={() => setOpen(!open)}
    >
      { !open ? 'login' : 'close' }
    </Button>
    <Popper open={open} anchorEl={anchorEl.current} placement="bottom-end">
      <Paper style={{ marginTop: '24px', padding: '24px', maxWidth: '272px' }} elevation={10}>
        <form noValidate autoComplete="on" onSubmit={submit}>
          <TextField
            inputProps={{ style: { textAlign: 'center' } }}
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <Button style={{ width: '100%', margin: '12px 0px 0px 0px'}}
            type="submit"
            disabled={!email}>
            continue
          </Button>
        </form>
      </Paper>
    </Popper>
  </>
}

function App() {

  useDocumentTitle("Hero Drop");
  const magic = useMagic();
  const [scene, updateScene, setScene] = useSceneManager(defaultScene);
  const [player, setPlayer] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggingIn, setLoggingIn] = React.useState(false);
  const [server, setServer] = React.useState();

  const handleLogin = async (email) => {
    console.log('Logging in with', email)
    if(!email) return;

    setLoggingIn(true);

    const playerObj = await magic.login(email);
    console.log('Logged in as', playerObj.email)
    const serverObj = await Server(playerObj.storage, 'hero-drop-app')
    
    function handleSync(data, b) {
      if(data.author !== serverObj.thread._3id.DID){
        let change = data.message;
        if(change.target === 'asset') {
          let { id, x, y } = change.data;
          if(change.function === 'handleDrop') {
            scene.assets.get(id)[1]({x,y})        
          }
        }
      }
      else {
        // This change was already done locally
      }
    }

    serverObj.onUpdate(handleSync)
    console.log(playerObj)
    console.log(serverObj)
    setPlayer(playerObj);
    setServer(serverObj);
    console.log('connected to server')
    //console.log(server)
    // validate(email)
    // handleLogin(email);

    setLoggedIn(true);
    setLoggingIn(false);
  }

  const sync = async (change) => {
    if(server) {
      server.sync(change)
    }
    
    if(change.target === 'asset') {
      let { id, x, y } = change.data;
      if(change.function === 'handleDrop') {
        scene.assets.get(id)[1]({x,y})        
      }
    }
  }
  
  React.useEffect(() => {
    /* Auto Login * /
    handleLogin('chicobitcoinjoe@gmail.com')
    /* */
  }, [])
  
  return (
    <MuiThemeProvider theme={customMuiTheme}>
      <CssBaseline />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ zIndex: '2', position: 'absolute', top: '24px', right: '24px' }}>
          { loggedIn || loggingIn ? null : <LoginButton handleLogin={handleLogin} /> }
        </div>
        <GameBoard {...scene} player={player} sync={sync} allowRightClick={true} />
      </div>    
    </MuiThemeProvider>
  );
  /*
      <Router>
        <Switch>
          <Route exact path="/hero-drop-app/sandbox" render={(props) => <Sandbox {...props} User={User} Scene={Scene} />} />
          <Route exact path="/hero-drop-app/campaign/:campaignId" render={(props) => <Campaign {...props} User={User} Scene={Scene} />} />
          <Route render={() => <Redirect to="/hero-drop-app/sandbox" />} />
        </Switch>
      </Router>
  */
}

export default App;
