import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import { resolve } from 'dns';

export class VotingController {

    static votingData = [
        {"username" : "tsirakos" , "name":"Deadpool" , "img":"assets/avatars/deadpool.png" , "votes":2 , "voted":["Pikachu"] , "votedBy" : ["Pikachu" , "Zelda"]},
        {"username" : "gazis" , "name" : "Iron Man" , "img":"assets/avatars/ironman.png" , "votes" : 0 , "voted":[] , "votedBy":[]}
    ]

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .get('/votingresults' , this.getVotingData)
            .post('/vote' , this.votePlayer)
            .post('/setdata' , this.setVotingData)
        return router;
    }

    public getVotingData(req: Request , res:Response){
        console.log("Returning Voting Data");
        res.status(200).send(VotingController.votingData);
    }


    public votePlayer(req: Request , res:Response){
        var body = req.body;
        if(body.name == undefined || body.vote == undefined) res.send(300).send({"message":"Incomplete body"});

        
        VotingController.votingData.forEach((elem) => {
            if(elem.name === body.vote){
                elem.votes = elem.votes + 1;
                elem.votedBy.push(body.name);
            }else if(elem.name === body.name){
                elem.voted.push(body.vote);
            }
        })


        const socket = DIContainer.get(SocketsService);
        socket.broadcast("voting_on_change" , VotingController.votingData);
        
        res.status(200).send({"message":"Voting Completed"})
    }



    public setVotingData(req: Request, res:Response){

        VotingController.votingData = req.body;
        res.status(200).send(VotingController.votingData);
    }



}