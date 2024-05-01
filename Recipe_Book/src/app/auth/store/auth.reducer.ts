import { User } from '../user.model';
import { AUTH_FAIL, AUTH_SUCCESS, AuthActions, CLEAR_ERROR, LOGIN, SIGNUP } from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTH_SUCCESS: // user = the new user that logged in
      const user = new User(
        action.payload.email,
        action.payload.userID,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        // user: user, // first user is the 'initialState' and the second is the 'const' created in the 'case':
        user, //  this also works. but only if the payload and the initialState have the same name
        loading: false,
      };
    case LOGIN: case SIGNUP: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AUTH_FAIL: {
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
      };
    }
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null, // no error anymore
      };
    default: return state;
  }
  //   switch (type) {

  //   case first:
  //     return { ...state, ...payload }

  //   default:
  //     return state
  //   }
}