import React from 'react'

function useServer(storage) {

  const [Private, setPrivate] = React.useState();
  const [Assets, setAssets] = React.useState();
  const [PrivateModerators, setPrivateModerators] = React.useState();
  const [PrivateMembers, setPrivateMembers] = React.useState();
  
  const [Public, setPublic] = React.useState();
  const [Messages, setMessages] = React.useState();
  //const [PublicModerators, setPublicModerators] = React.useState();
  const [PublicMembers, setPublicMembers] = React.useState();

  const startServer = async (sharedPrivateData, handleUpdate, handlePermissionChange) => {
    let privateModerators = await sharedPrivateData.listModerators();
    let privateMembers = await sharedPrivateData.listMembers();
    let privatePosts = await sharedPrivateData.getPosts();
    
    let sharedPublicData = await storage.joinThread(sharedPrivateData.address, { ghost: true });
    let publicModerators = await sharedPublicData.listModerators();
    let publicMembers = await sharedPublicData.listMembers();
    let publicPosts = await sharedPublicData.getPosts();
    
    setPrivate(sharedPrivateData);    
    setAssets(privatePosts)
    setPrivateModerators(privateModerators);
    setPrivateMembers(privateMembers);
    console.log(privateModerators)
    console.log(privateMembers)
    console.log(privatePosts)

    function onPrivateUpdate() {
      if(handleUpdate) handleUpdate()
    }
    
    function onNewPrivateCapabilities() {
      if(handlePermissionChange) handlePermissionChange()
    }
    
    sharedPrivateData.onUpdate(onPrivateUpdate);
    sharedPrivateData.onNewCapabilities(onNewPrivateCapabilities);

    setPublic(sharedPublicData);
    //setPublicModerators(publicModerators);
    setPublicMembers(publicMembers);
    setMessages(publicPosts);
    console.log(publicModerators)
    console.log(publicMembers)
    console.log(publicPosts)

    function onPublicUpdate() {
      if(handleUpdate) handleUpdate()
    }
    
    function onNewPublicCapabilities() {
      if(handlePermissionChange) handlePermissionChange()
    }
    
    sharedPublicData.onUpdate(onPublicUpdate);
    sharedPublicData.onNewCapabilities(onNewPublicCapabilities);

    return;
  }

  const create = async (name, handleUpdate, handlePermissionChange) => {
    let sharedPrivateData = await storage.createConfidentialThread(name)
    startServer(sharedPrivateData, handleUpdate, handlePermissionChange)
  }

  const join = async (address, handleUpdate, handlePermissionChange) => {
    let sharedPrivateData = await storage.joinThreadByAddress(address)
    return await startServer(sharedPrivateData, handleUpdate, handlePermissionChange)
  }

  const broadcast = (message) => {
    Public.post(message)
  }

  const store = (message) => {
    Private.post(message)
  }

  const joinPublicServer = (address, handleUpdate, handlePermissionChange) => {

  }

  return {
    create,
    join,
    joinPublicServer,
    broadcast,
    store,
    assets: Assets,
    messages: Messages,
    admins: PrivateModerators,
    members: PrivateMembers,
    joinRequests: PublicMembers.filter(member => !PrivateMembers.includes(member)),
  }

}

export default useServer;