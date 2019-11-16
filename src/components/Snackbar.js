import React, { useContext } from 'react';
import Alert from './Alert';
import Store from '../store/Context';

const Snackbar = () => {
  const { state } = useContext(Store);
  console.log('sata', state);
  return (
    <div>
      {/* {state.alerts > 0 &&
        state.alerts.map((a, key) => <Alert data={a} index={key} />)} */}
    </div>
  );
};

export default Snackbar;
