import { combineReducers } from 'redux';

// reducers
import { alert, auth } from './utility';

const globalReducer = combineReducers({
  alert,
  auth,
});

export default globalReducer;
