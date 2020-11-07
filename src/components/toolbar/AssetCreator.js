import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Asset from '../Asset';
import AssetForm from '../AssetForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export default function AssetCreator({ asset, editAsset }) {
  
  const classes = useStyles();

  const handleTypeChange = async (event) => {
    const newType = event.target.value;
    if(newType === 'avatar') {
      editAsset({
        type: newType,
        width: 1,
        height: 1,
        src: null,
        textColor: '#FFFFFF',
        backgroundColor: '#0062B1',
      })
    }
    else if(newType === 'text') {
      editAsset({
        type: newType,
        text: 'Hero Drop',
        fontSize: 18,
        width: 200,
        height: 100,
        src: null,
        textColor: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)',
      })
    }
    else if(newType === 'object') {
      editAsset({
        type: newType,
        src: 'https://i.pinimg.com/originals/f2/8d/ed/f28ded56a3a38308a0d770d009f90416.png',
        width: 100,
        height: 100,
        textColor: '#FFFFFF',
        backgroundColor: '#0062B1',
        rotation: 0,    
      })
    }      
  };

  return <>
    <div style={{ fontWeight: 'bold', fontSize: '18px', padding: '11.5px 0px'}}>Asset Creator</div>
    <form className={classes.form} noValidate autoComplete="off">
      <FormControl style={{width: '100%'}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={asset.type ? asset.type : ''}
          onChange={handleTypeChange}
        >
          <MenuItem value={'avatar'}>Avatar</MenuItem>
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'object'}>Object</MenuItem>
        </Select>
      </FormControl>
      <div style={{ height: '16px', width: '100%' }}></div>
      <AssetForm asset={asset} editAsset={editAsset} />      
      {
        !asset.width || !asset.height ? null : 
        <>
          <div style={{ textAlign: 'center', width: '100%', padding: '12px 0', fontSize: '12px' }}>Preview (click a tile to place)</div>
          <div style={{ width: '100%', height: '128px', marginTop: '12px', overflow: 'auto' }}>
            <Asset asset={asset} />
          </div>
        </>
      }
    </form>    
  </>  
}