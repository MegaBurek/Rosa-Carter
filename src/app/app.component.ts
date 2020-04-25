import { Component } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

const fade = [
  query(':self', 
    [
      style({ opacity: 0 })
    ], 
    { optional: true }
  ),

  query(':self',
    [
      style({ opacity: 0 }),
      animate('.7s ease-in', style({ opacity: 1 }))
    ], 
    { optional: true }
  )
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('* => *', fade)
    ])
  ]
})


export class AppComponent {
  title = 'Rosa-Carter';

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
