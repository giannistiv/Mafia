import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import { resolve } from 'dns';
import { Socket } from 'dgram';
import SocketIORedis = require('socket.io-redis');

export class VotingController {

    static votingData : any = [];

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


    static setData(data :any){
        VotingController.votingData = data;
        console.log('%c Got voting data from init controller' , 'color:green');
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("change_screens" , "");
    }

    public votePlayer(req: Request , res:Response){
        var body = req.body;
        if(body.name == undefined || body.vote == undefined) res.send(300).send({"message":"Incomplete body"});

        console.log(body);
        var voter;
        var votee;
        for(var i = 0; i < VotingController.votingData.length; i++){
            if(VotingController.votingData[i].char.name == body.name){
                voter = i 
            }else if(VotingController.votingData[i].char.name == body.vote){
                votee = i
            }
        }

        console.log(VotingController.votingData[voter] , VotingController.votingData[votee]);
        console.log(voter , votee);
        VotingController.votingData[votee].votes = VotingController.votingData[votee].votes + 1;
        VotingController.votingData[votee].votedBy.push(VotingController.votingData[voter].char);
        
        VotingController.votingData[voter].voted.push(VotingController.votingData[votee].char);

        const socket = DIContainer.get(SocketsService);
        socket.broadcast("voting_on_change" , VotingController.votingData);
        res.status(200).send({"message":"Voting Completed"})
    }



    public setVotingData(req: Request, res:Response){

        VotingController.votingData = req.body;
        res.status(200).send(VotingController.votingData);
    }



}