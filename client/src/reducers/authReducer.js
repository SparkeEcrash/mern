import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        //if action.payload is empty it means there was an error during logging in/authentication process 
        user: action.payload
        //when logging out, we can pass an empty object to wipe out user information 
      }
    default:
      return state;
  }
}