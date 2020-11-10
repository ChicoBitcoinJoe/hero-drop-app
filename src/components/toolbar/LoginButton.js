import React from 'react'

import Button from "@material-ui/core/Button";
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export default function LoginButton({ handleLogin }) {
  
  const [anchorEl] = React.useState(React.createRef());
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