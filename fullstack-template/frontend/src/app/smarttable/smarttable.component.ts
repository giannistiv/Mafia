import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor() { }

  votingResults = [
    {"percentage" : "80%" , "color" : "red" , "name" : "DeadPool"},
    {"percentage" : "20%" , "color" : "green" , "name" : "Maverik"},
    {"percentage" : "0%" , "color" : "yellow" , "name" : "Iglo"}
  ]
  ngOnInit() {
  }

}
