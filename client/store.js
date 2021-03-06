import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Axios from '../node_modules/axios';

const GET_USER = 'GET_USER';

const _getUser = user => ({
  type: GET_USER,
  user,
});
export const login = formData => dispatch => {
  return Axios.put('/auth/login', formData)
    .then(res => res.data)
    .then(user => dispatch(_getUser(user)))
    .catch(console.error.bind(console));
};

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.user };
    }
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
