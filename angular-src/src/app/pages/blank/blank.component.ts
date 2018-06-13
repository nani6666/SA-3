import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'az-blank',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
