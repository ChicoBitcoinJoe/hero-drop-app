import React from 'react';

const Box = require('3box');
const ethers = require('ethers');
const { Magic, RPCError, RPCErrorCode } = require('magic-sdk');
const magic = new Magic('pk_test_F879423DC899077C', {
  network: "ropsten" // Supports "mainnet", "rinkeby", "ropsten", "kovan"
});

const useMagic = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState();
  const [box, setBox] = React.useState();
  const [space, setSpace] = React.useState();

  const login = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email, showUI: true });
      if(await magic.user.isLoggedIn()) {
        const metadata = await magic.user.getMetadata();
        const address = metadata.publicAddress;
        const spaces = ['hero-drop-app'];
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const box = await Box.create();
        await box.auth(spaces, { address, provider })
        await box.syncDone
        const storage = box.spaces['hero-drop-app']
        //console.log(metadata, box)
        return {
          email,
          metadata,
          address,
          provider,
          box,
          storage
        }
      }
      else {
        throw new Error('failed to log in');
      }
    } catch(err) {
      console.error(err)
      if (err instanceof RPCError) {
        switch(err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
          default: // Handle errors accordingly :)
          break;
        }
      }
    }
  }

  /*
  const login = async (email) => {
    setEmail(email)
    setIsLoggingIn(true);
    try {
      await magic.auth.loginWithMagicLink({ email, showUI: true });
      if(await magic.user.isLoggedIn()) {
        let metadata = await magic.user.getMetadata();
        const address = metadata.publicAddress;
        const spaces = ['hero-drop-app'];
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const box = await Box.create();
        await box.auth(spaces, { address, provider })
        await box.syncDone
        console.log(metadata, box)
        setAddress(metadata.publicAddress);
        setBox(box);
        setSpace(box.spaces['hero-drop-app']);
        setLoggedIn(true);
      }
      else {
        throw new Error('failed to log in');
      }
    } catch(err) {
      console.error(err)
      if (err instanceof RPCError) {
        switch(err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
          default: // Handle errors accordingly :)
          break;
        }
      }
    }
    setIsLoggingIn(false);
  }
  */

  const logout = async () => {
    await box.logout();
    await magic.user.logout();
    setLoggedIn(false);
  }
    
  return {
    email,
    isLoggingIn,
    isLoggedIn,
    address,
    box,
    data: space,
    login,
    logout,
    set: {
      email: setEmail,
    }
  }
}

export default useMagic;
