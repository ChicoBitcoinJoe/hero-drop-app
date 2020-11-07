import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function LoginForm({ handleLogin }) {

  const [email, setEmail] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    handleLogin(email)
  };

  return <>
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
      <Button
        variant="outlined"
        className="green"
        style={{ width: '100%', margin: '16px 0px'}}
        type="submit"
        disabled={!email}>
        continue
      </Button>
    </form>
  </>
}