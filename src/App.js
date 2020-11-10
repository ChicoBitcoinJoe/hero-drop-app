import React from 'react';
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import useDocumentTitle from './hooks/useDocumentTitle';
import Magic3Box from './services/Magic3Box';
import useSceneManager from './services/Scene';
import GameBoard from './components/gameboard/GameBoard';
import LoginButton from './components/toolbar/LoginButton';

import './App.css';
import 'react-contexify/dist/ReactContexify.min.css';
import defaultScene from './defaultScene';

const Magic = new Magic3Box();
const customMuiTheme = createMuiTheme({ palette: { type: "dark" }});

function App() {

  useDocumentTitle("Hero Drop");

  const [scene, updateScene, setScene] = useSceneManager(defaultScene);
  const [server, setServer] = React.useState();
  const [player, setPlayer] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggingIn, setLoggingIn] = React.useState(false);

  const handleLogin = async (email) => {
    console.log('Logging in with', email)
    if(!email) return;

    setLoggingIn(true);

    const magicPlayer = await Magic.login(email, ['hero-drop-app']);
    console.log(magicPlayer)
    const ghostServer = await Magic.ghostServer('hero-drop-app', magicPlayer.box.spaces['hero-drop-app'])
    
    function handleSync(data) {
      if(data.author !== ghostServer.thread._3id.DID){
        let change = data.message;
        if(change.target === 'asset') {
          let { id, x, y } = change.data;
          if(change.function === 'handleDrop') {
            scene.assets.get(id)[1]({x,y})        
          }
        }
      }
      else {
        console.log('This change was already done locally')
      }
    }
    ghostServer.onUpdate(handleSync)

    setPlayer(magicPlayer);
    setServer(ghostServer);
    setLoggedIn(true);
    setLoggingIn(false);
    console.log('connected to server')
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
}

export default App;
