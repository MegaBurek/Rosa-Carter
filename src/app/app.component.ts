import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetAllBras, GetAllSets, GetAllUndies} from './store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {


  constructor(
    private store: Store
  ) {

  }

  ngOnInit() {
    this.store.dispatch(new GetAllBras());
    this.store.dispatch(new GetAllUndies());
    this.store.dispatch(new GetAllSets());
  }


}
