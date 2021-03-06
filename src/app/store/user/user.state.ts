import { User } from '../../model/user.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetLoggedInUser } from './user.actions';

export class UserStateModel {
  loggedInUser: User;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedInUser: {
      uid: null,
      email: null,
      imageUrl: null,
      displayName: null,
      phoneNumber: null,
      role: null,
      name: null,
      surname: null,
      dob: null,
      orders: null,
      emailVerified: null
    }
  }
})
@Injectable()
export class UserState {
  constructor() {
  }

  @Selector()
  static getUserName(state: UserStateModel) {
    return state.loggedInUser.name;
  }

  @Action(SetLoggedInUser)
  setLoggedInUser(ctx: StateContext<UserStateModel>, {user}: SetLoggedInUser) {
    const state = ctx.getState();
    ctx.setState({...state, loggedInUser: user});
  }
}
