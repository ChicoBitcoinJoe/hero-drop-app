import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AssetForm from './AssetForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export default function AssetEditor({ open, anchorEl, editableAsset, onClose }) {
  
  const classes = useStyles();
  const [asset, editAsset] = editableAsset;  

  const closeEditor = () => {
    onClose()
  }

  return <>
    <Grid container direction="row" justify={'space-between'} alignItems={'center'}>
      <Grid item>
        <div style={{ fontWeight: 'bold', fontSize: '18px'}}>Asset Editor</div>
      </Grid>
      <Grid item>
        <IconButton onClick={closeEditor}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
    <form className={classes.form} noValidate autoComplete="off">
      <AssetForm asset={asset} editAsset={editAsset} anchorEl={anchorEl} />
    </form>
  </>
}