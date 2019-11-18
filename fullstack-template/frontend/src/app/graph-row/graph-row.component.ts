import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-graph-row',
  templateUrl: './graph-row.component.html',
  styleUrls: ['./graph-row.component.scss']
})
export class GraphRowComponent implements OnInit {

  constructor() { }


  @Input() inputWidth;
  @Input() inputColor;
  @Input() inputName;
  @Input() img
  
    ngOnInit() {
  }

}
