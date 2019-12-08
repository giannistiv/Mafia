import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  public bio: boolean;
  public day: boolean;
  public history: boolean;
  public img: string;

  constructor() { }
  players = [
    { "name": "DeadPool", "img": "assets/avatars/deadpool.png" },
    { "name": "Pikachu", "img": "assets/avatars/pikachu.png" },
    { "name": "Iron Man", "img": "assets/avatars/ironman.png" },
    { "name": "Spiderman", "img": "assets/avatars/spiderman.png" },
    { "name": "Mario", "img": "assets/avatars/mario.png" },
    { "name": "Luigi", "img": "assets/avatars/luigi.png" },
    { "name": "Batman", "img": "assets/avatars/batman.png" },
    { "name": "Sonic", "img": "assets/avatars/sonic.png" },
    { "name": "Spongebob", "img": "assets/avatars/spongebob.png" },
  ]

  ngOnInit() {
    this.bio = false;
    this.day = true;
    this.history = false;
  }

  messagesfrombio(event) {
    this.bio = true;
  }

  messagesfromhistory(event) {
    this.history = true;
  }

  messagesfromexit(event) {
    this.bio = false;
    this.history = false;
  }

  messagesfromday(event) {
    this.day = !this.day;
  }

  messagesfrombody(event) {
    this.img = event;
  }


}