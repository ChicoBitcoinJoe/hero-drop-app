import React from 'react';

export default function useObject(initialState) {

  const [state, setState] = React.useState(initialState)

  const updateState = (newState) => {
    setState(prevState => {
      return {
        ...prevState,
        ...newState
      }
    })
  }

  return [state, updateState, setState];
}