import React from 'react';

export default function useKeyPress(keyCode) {

  const [keyDown, setKeyDown] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = ({key}) => {
      if(keyCode === key) {
        setKeyDown(true)
      }
    }

    const onKeyUp = ({key}) => {
      if(keyCode === key) {
        setKeyDown(false)
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return keyDown;
}