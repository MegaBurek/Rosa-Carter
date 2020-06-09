import {User} from 'src/app/model/user.model';
import {State, Selector, Action, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {GetUser, DeleteUser, RegisterUser} from './user.actions';
import {Injectable} from "@angular/core";


export class UserStateModel {
  new_members: User[];
  selectedUser: User;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    new_members: [],
    selectedUser: {
      uid: null, email: null, imageUrl: null, displayName: null, role: null, name: null, surname: null, dob: null, orders: [], emailVerified:false
    }
  }
})
@Injectable()
export class UserState {

}
