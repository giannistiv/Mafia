import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-phase',
  templateUrl: './mobile-phase.component.html',
  styleUrls: ['./mobile-phase.component.scss']
})
export class MobilePhaseComponent implements OnInit {

  constructor() { }

  phase = [
    {"name":"Vote"},
    {"name":"Protect"},
    {"name":"Kill"},
  ]

  ngOnInit() {
  }

}
