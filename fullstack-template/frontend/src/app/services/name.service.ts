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
 * Votes Number
 * Votes he mad
 * From who was voted
 * 
 * for each player of the game!
 * 
 * This service will be initialized after when the "Ok google lets play" is triggered!
 */
export class NameService {


  personalData = {};


  charactersData = [
    {"name":"Deadpool" , "img":"assets/avatars/deadpool.png" , "color":"red" ,  "user":"ktsirakos"},
    {"name":"Pikachu" , "img":"assets/avatars/pikachu.png" , "color":"yellow" ,  "user":"gazis"},
    {"name":"Batman" , "img":"assets/avatars/batman.png" , "color":"grey" ,  "user":"stiv"},
    {"name":"Sonic" , "img":"assets/avatars/sonic.png" , "color":"blue" ,  "user":"leonidis"},
    {"name":"Iron Man" , "img":"assets/avatars/ironman.png" , "color":"orange" ,  "user":"leonidis"},
  ]

  constructor() { }

  public getDataByName(name) : any {
   
      for(var i = 0; i < this.charactersData.length; i++){
        if(this.charactersData[i].name == name){
          return this.charactersData[i];
        }
      }

      return {"message":"Not found"}
  }


  public getCharacterByPlayer(playerName){
    this.charactersData.forEach((elem) => {
      if(elem.user == playerName){
        return elem;
      }
    })
  }

  public getPlayerByCharacter(char){
    this.charactersData.forEach((elem) => {
      if(elem.name == char){
        return elem;
      }
    })
  }

  public getDataByChar(charname) : any {
    return this.getDataByName(charname);
  }

  public setPersonalData(data){
    this.personalData = data;
  }

  public getPersonalData(){
    return this.personalData;
  }


}
