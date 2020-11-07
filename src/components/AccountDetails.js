import React from 'react';
//import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: '100%',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '320px',
  },
  gridTile: {
    margin: '0 12px !important',
    width: '320px',
    border: '2px solid white',
  },
}));

function AccountDetails({ user, handleClose }) {

  const classes = useStyles();
  
  const [campaigns, setCampaigns] = React.useState([]);
  const getCampaignList = async () => {
    let campaignList = await user.data.private.get('campaigns')      
    if(campaignList) setCampaigns(campaignList)
  }

  React.useEffect(() => {
    getCampaignList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  const createCampaign = async (campaignName) => {
    const privateThread = await user.data.createConfidentialThread(campaignName)
    let campaignId = privateThread.address;
    if(!campaignId) return new Error('failed to create campaign', campaignId);
    let campaigns = await user.data.private.get('campaigns');
    if(!campaigns) campaigns = [];
    campaigns.push(campaignId);
    await user.data.private.set('campaigns', campaigns);
    history.push('/hero-drop-app/' + encodeURIComponent(campaignId));
  }
  */

  const logout = async () => {
    await user.logout()
    handleClose()
  }

  return (
    <div className={classes.root}>
      {
        user.isLoggedIn ? 
        <div style={{ lineHeight: '32px', marginTop: '32px' }}>
          <b>{user.email}</b>
          &nbsp;&nbsp;&nbsp;
          <Button style={{ cursor: 'pointer' }} onClick={() => logout}>logout</Button>
        </div> :
        null
      }

      <div style={{ height: '180px' }}></div>
      
      <GridList component="div" className={classes.gridList} cellHeight={280} cols={2.5}>
        <GridListTile component="div" key="newCampaign" className={classes.gridTile}> 
          <div style={{ height: '100%', margin: '48px 0px' }}>
            <div style={{ fontSize: '96px', textAlign: 'center' }}>+</div>
            <h1>Create Campaign</h1>
          </div>
        </GridListTile>
        {
          campaigns.map((campaignId, i) => {
            let tile = {
              img: 'https://i.redd.it/63p7lc2f6rr31.jpg',
              title: campaignId,
              author: 'todo'
            }
            
            return <GridListTile key={tile.img} className={classes.gridTile}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          })
        }
      </GridList>
    </div>
  );
  
}

/*

return <>
    {
      user.isLoggedIn ? 
      <div style={{ lineHeight: '32px', marginTop: '32px' }}>
        <b>{user.email}</b>
        &nbsp;&nbsp;&nbsp;
        <a style={{ cursor: 'pointer' }} onClick={() => logout}>logout</a>
      </div> :
      null
    }

    <div style={{ height: '240px' }}></div>

    {
      campaigns.map((campaignId, i) => {
        let tile = {
          img: 'https://i.redd.it/63p7lc2f6rr31.jpg',
          title: campaignId,
          author: 'todo'
        }
        return <GridListTile component="div" key={tile.img+i} cols={3} className={classes.gridTile}>
          <img src={tile.img} alt={tile.title} style={{ cursor: 'pointer' }} onClick={onClick} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
            actionIcon={
              <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>            
      })
    }

    <GridList cellHeight={320} cols={1} className={classes.gridList}>
      <GridListTile key="newCampaign" className={classes.gridTile}> 
        <img src={'https://i.redd.it/63p7lc2f6rr31.jpg'} alt={'newCampaign'} style={{ cursor: 'pointer' }} />
        <GridListTileBar
          title={'create new campaign'}
          actionIcon={
            <IconButton aria-label={`create new campaign`} className={classes.icon} onClick={() => { createCampaign('New Campaign') }}>
              <AddIcon />
            </IconButton>
          }
        />
      </GridListTile>
    </GridList>
  </>
  

*/
export default AccountDetails;
