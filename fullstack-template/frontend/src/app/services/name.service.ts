import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


/**
 * Name service
 * 
 * This service is responsible for handling the 
 * 
 * Name
 * Icon
 * Votes
 * From who was voted
 * 
 * for each player of the game!
 * 
 * This service will be initialized after when the "Ok google lets play" is triggered!
 */
export class NameService {



  players = [
    {"username":"ktsirakos" , "name":"DeadPool" , "img": "assets/avatars.deadpool.png" , "votes": 2 , "voted" : ["Picachu" , "Iron-Man"]}
  ]

  
  constructor() { }
}
