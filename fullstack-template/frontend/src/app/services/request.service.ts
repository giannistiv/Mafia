import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NameService } from './name.service';
import { environment } from '../../environments/environment'
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

  constructor(
                public http: HttpClient,
                private nameService: NameService
              ) { }

  url = environment.host;
  testingEndpoint = "/api/initprocedure/availableicons"
  addPlayerEndpoint = "/api/initprocedure/addPlayer"
  getAvailableIconsEndpoint = "/api/initprocedure/availableicons"
  getPlayersEndpoint = "/api/initprocedure/players"
  startgameEndpoint = "/api/initprocedure/startgame"
  getrandomrole = "/api/initprocedure/randomrole"
  reserveIcon = "/api/initprocedure/reserveicon"
  unreserveIcon = "/api/initprocedure/unreserveicon"
  votingPlayerEndpoint = "/api/voting/vote"
  setVotingDataEndpoint = "/api/voting/setdata"
  getVotingResultsEndpoint = "/api/voting/votingresults"
  deleteVoteEndpoint = "/api/voting/removevote"
  dieEndpoint = "/api/voting/die"
  nextRoundEndpoint = "/api/voting/nextRound"
  setAliveDataEndpoint = "/api/info/initactiveplayers"
  getAliveDataEndpoint = "/api/info/activeplayers"
  setLastDeadEndpoint = "/api/info/addlastdead"
  getLastDeadEndpoint = "/api/info/lastdead"
  setDeadDataEndpoint = "/api/info/initdeadplayers"
  getDeadDataEndpoint = "/api/info/deadplayers"
  addRoundEndpoint = "/api/info/addround"
  getRoundEndpoint = "/api/info/round"
  getrolesinfo = "/api/info/getrolesinfo"
  
  public checkServerRunning(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.testingEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }
  
  
  public die(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.dieEndpoint).subscribe((data) => {
        resolve(data);
      })
    })
  }

  public openDoctorPhone(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + "/api/voting/opendoctor").subscribe((data) => {
        resolve(data);
      })
    })

  }

  public nextRound(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.nextRoundEndpoint).subscribe((data) => {
        resolve(data);
      })
    })
  }
  
  public addPlayer(player : any){
    this.nameService.setPersonalData(player);
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
  
  public vote(user , votedName){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.votingPlayerEndpoint , {"name" : user , "vote" : votedName}).subscribe((data) => {
        resolve(data);
      })
    })
  }
  
  public deleteVote(user , votedName){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.deleteVoteEndpoint , {"name" : user , "vote" : votedName}).subscribe((data) => {
        resolve(data);
      })
    })
  }
  
  public startGame(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.startgameEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }
  
  
  public setVotingData(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getPlayersEndpoint).subscribe((data) => {
        console.log("Start game" , data);
        this.http.post(this.url + this.setVotingDataEndpoint , data).subscribe((data) => {
          resolve(data);
        })
      })
    })
  }


  public reserve(icon){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.reserveIcon , { "img" : icon}).subscribe((data) => {
        resolve(data);
      })
    })
  }

  public getVotingResults(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getVotingResultsEndpoint).subscribe((data) => {
        resolve(data);
      })
    })
  }

  public unreserve(icon , role){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.unreserveIcon , { "img" : icon , "role" : role}).subscribe((data) => {
        resolve(data);
      })
    })
  }

  public setAliveData(players: any[]){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.setAliveDataEndpoint , players).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getAliveData(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getAliveDataEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public setLastDead(player: any){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.setLastDeadEndpoint , player).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getLastDead(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getLastDeadEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public setDeadData(players: any[]){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.setDeadDataEndpoint , players).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getDeadData(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getDeadDataEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public addRound(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.addRoundEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getRound(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getRoundEndpoint).subscribe((data) => {
        resolve(data);
      });
    })
  }

  public getRandomRole(name){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + this.getrandomrole, {"name" : name}).subscribe((data :any) => {
        resolve(data.role);
      })
    })
  }

  public getRolesInfo(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + this.getrolesinfo).subscribe((data) => {
        resolve(data);
      })
    })
  }

  public killingVote(rolename , person){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + "/api/voting/killing" , {"role" : rolename , "person" : person}).subscribe((data) => {
        resolve(data);
      })
    })
  }
  


  public removeVote(voter , votee){
    return new Promise((resolve , reject) => {
      this.http.post(this.url + "/api/voting/removevote" , {"name" : voter , "vote" : votee}).subscribe(data => {
        resolve(data);
      })
    })
  }

  public showKillingScreen(){
    return new Promise((resolve , reject) => {
      this.http.get(this.url + "/api/voting/killing").subscribe((data) => {
        resolve(data);
      })
    })
  }
}
