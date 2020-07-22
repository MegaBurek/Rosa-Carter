import {User} from '../../model/user.model';

export class SetLoggedInUser {
  static readonly type = '[User API] Set Logged In User';

  constructor(public user: User) {
  }
}
