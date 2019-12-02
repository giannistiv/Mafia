import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Request service is responsible for making 
 * requests easier to be make with a simple function and 
 * observables
 * 
 * This service will have predefined functions for common requests
 */
export class RequestService {

  constructor(public http: HttpClient) { }

  url = "http://localhost:8080";
  testingEndpoint = "/api/initprocedure/availableicons"
  addPlayerEndpoint = "/api/initprocedure/addPlayer"
  getAvailableIconsEndpoint = "/api/initprocedure/availableicons"
  getPlayersEndpoint = "/api/initprocedure/players"

  public checkServerRunning(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.testingEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }



  public addPlayer(player : any){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.addPlayerEndpoint , player).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getAvailableIcons(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getAvailableIconsEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getPlayers(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getPlayersEndpoint).subscribe((data) => {
        resolve(data);
      })
    })
  }


}
