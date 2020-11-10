const Box = require('3box')
const { Magic, RPCError, RPCErrorCode } = require('magic-sdk')
const magic = new Magic('pk_test_F879423DC899077C', {
  network: "ropsten" // Supports "mainnet", "rinkeby", "ropsten", "kovan"
})

export default function Magic3Box() {
  
  const login = async (email, spaces) => {
    try {
      await magic.auth.loginWithMagicLink({ email, showUI: true });      
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
    
    try {
      if(await magic.user.isLoggedIn()) {
        const metadata = await magic.user.getMetadata()
        console.log('Logged in as', metadata.email)
        const address = metadata.publicAddress
        const provider = magic.rpcProvider
        const box = await Box.create();
        if(!spaces) spaces= []
        await box.auth(spaces, { address, provider })
        await box.syncDone
  
        return {
          email,
          address,
          metadata,
          provider,
          box,
          logout: async () => {
            await box.logout();
            await magic.user.logout();
          }
        }
      }
      else {
        console.log('err')
        throw new Error('failed to log in');
      }
    }
    catch (err) {
      console.error(err)
    }
    
  }

  const ghostServer = async (name, space) => {
    let thread = await space.joinThread(name,{ ghost: true});
    return {
      name,
      space,
      thread,
      sync: (unsyncedData) => {
        thread.post(unsyncedData)
      },
      onUpdate: (fn) => thread.onUpdate(fn)
    };
  }

  return {
    login,
    ghostServer
  }
}
