import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { NameService } from './name.service';

@Injectable({
  providedIn: 'root'
})




/**
 * This service will be responsible for handling and
 * having in the correct form of everything that has to do with voting
 *(maybe this will be deleted)
 */
export class VotingService {

  
  constructor(
    private requestService: RequestService,
    private nameService : NameService) { }



  deleteVote(voteeName){
    return new Promise((resolve , reject) => {
      this.requestService.deleteVote(this.nameService.getPersonalData().char.name , voteeName).then((data) => resolve(data)).catch(err => reject(err));
    })
  }

  votePlayer(voteeName){
    return new Promise((resolve , reject) => {
      this.requestService.vote(this.nameService.getPersonalData().char.name , voteeName).then((data) => resolve(data)).catch(err => reject(err));
    })
  }

  getResult(){
    return new Promise((resolve , reject) => {
      this.requestService.getVotingResults().then((data) => resolve(data)).catch(err => reject(err));
    })
  }
}