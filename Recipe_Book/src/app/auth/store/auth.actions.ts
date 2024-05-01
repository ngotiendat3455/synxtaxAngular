
import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] LOGIN';
// export const LOGIN_START = '[Auth] LOGIN_START';
// export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';
export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export const SIGNUP = '[Auth] SIGNUP';

export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      pswrd: string;
    }
  ) { }
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userID: number;
      token: string;
      expirationDate: Date;
    }
  ) { }
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class SignUp implements Action {
  readonly type = SIGNUP;

  constructor(
    public payload: {
      email: string;
      pswrd: string;
    }
  ) {}
}
export type AuthActions = ClearError | AutoLogin | Login | Logout | AuthSuccess | AuthFail | SignUp;
