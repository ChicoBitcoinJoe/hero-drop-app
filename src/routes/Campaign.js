import React from 'react'

import useServer from '../services/Server'

function Campaign(props) {

  const { user } = props;

  let campaignId = decodeURIComponent(props.match.params.campaignId);
  //const server = useServer(campaignId, user.data);

  const handleUpdate = (a,b) => {
    console.log(a,b)
  }

  const handlePermissionChange = (a,b) => {
    console.log(a,b)
  }

  React.useEffect(() => {
    if(user.isLoggedIn) {
      //server.join(campaignId, handleUpdate, handlePermissionChange);
      //console.log(server)
      //assets.register(server.assets)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn])
   
    //<Scene assets={assets} settings={{}} />
  return <>
  </>;
}

export default Campaign
