import React, { useReducer } from 'react';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = (props) => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = ({ alert }) => {
    dispatch({
      type: SET_ALERT,
      payload: alert,
    });
  };

  // Remove Alert
  const removeAlert = () => dispatch({ type: REMOVE_ALERT });

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
