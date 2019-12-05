import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service will be responsible for handling and
 * having in the correct form of everything that has to do with voting
 *(maybe this will be deleted)
 */
export class VotingService {



  constructor(private requestService: RequestService) { }

  user = "Zelda"

  votePlayer(playername){
    return new Promise((resolve , reject) => {
      this.requestService.vote(this.user , playername).then((data) => resolve(data)).catch(err => reject(err));
    })
  }

  getResult(){
    return new Promise((resolve , reject) => {
      this.requestService.getVotingResults().then((data) => resolve(data)).catch(err => reject(err));
    })
  }
}
