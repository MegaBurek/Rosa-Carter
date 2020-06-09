import {User} from "../../model/user.model";

export class RegisterUser {
  static readonly type = '[User API] Register User';

  constructor(public user: User) {
  }
}

export class GetAllUsers {
  static readonly type = '[User API] Get All Users';
  constructor(){}
}

export class GetNewMembers {
  static readonly type = '[User API] Get New Members';
  constructor(){}
}

export class DeleteUser {
  static readonly type = '[User API] Delete User';

  constructor(public id: string) {
  }
}

export class GetUser {
  static readonly type = '[User API] Get User';

  constructor(public id: string) {
  }
}
