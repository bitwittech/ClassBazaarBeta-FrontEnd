import React, { useContext } from 'react';
import Alert from './Alert';
import Store from '../store/Context';

const Snackbar = () => {
  const { state } = useContext(Store);
  return (
    <div>
      {state.alerts.length > 0
        ? state.alerts.map((a, i) => <Alert data={a} />)
        : null}
    </div>
  );
};

export default Snackbar;
