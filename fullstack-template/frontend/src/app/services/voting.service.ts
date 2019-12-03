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
    this.requestService.vote(this.user , playername).then((data) => console.log(data)).catch(err => console.error(err));
  }

  getResult(){
    this.requestService.getVotingResults().then((data) => console.log(data)).catch(err => console.error(err));
  }
}
