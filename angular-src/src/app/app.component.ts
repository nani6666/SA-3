import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'az-root',
  encapsulation: ViewEncapsulation.None,
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent { }
