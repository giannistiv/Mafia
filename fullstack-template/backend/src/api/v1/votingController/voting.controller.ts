import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService, SocketServer } from '@app/services';
import { InfoController } from '../infoController/info.controller';
import { RESET_CONTENT } from 'http-status-codes';

export class VotingController {

    static votingData : any = [];
    static Players : any = 0;
    static PlayersVoted : any = 0;
    static round = 1;
    static tobediednext :any = undefined;

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
            .get('/createHistoryData' , VotingController.CreateHistoryData)
            .post('/removevote' , this.removeVote)
            .get('/die' , this.SomeoneHasToDie)
            .get('/nextRound' , this.NextRound)
            .get('/opendoctor' , this.openDoctorPhone)
            .post('/killing' , this.killingVoting)
            .get('/killing' , this.killingScreen)
            .post('/protected' , this.protected)
            .post('/killingdone' , this.donekilling)
        return router;

    }


    public donekilling(req : Request , res : Response){
        VotingController.tobediednext = req.body;
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("proceed" , "");
        res.status(200).end();
    }


    public protected(red : Request , res : Response){
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("doctor_voted" , "");
        res.status(200).end();
    }

    public killingScreen(req : Request , res : Response){
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("open_killing_screen" , "");

        res.status(200).end();
    }


    public killingVoting(req : Request , res : Response){
        var data = req.body;


        const socket = DIContainer.get(SocketsService);
        if(data.rolename == "Barman"){
            socket.broadcast("open_don_barman_1_kill_voteoctor" , data.person);
        }else if(data.rolename == "Barman 1"){
            socket.broadcast("on_barman_2_kill_vote" , data.person);
        }else if(data.rolename == "Godfather"){
            socket.broadcast("on_godfather_kill_vote" , data.person);
        }
        
        res.status(200).end();
    }

    public openDoctorPhone(req : Request , res : Response){
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("open_doctor" , "");
        res.status(200).end();
    }



    public NextRound(req : Request , res: Response){
        VotingController.ResetRound();
        InfoController.round++;
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("next_round" , VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes));
        InfoController.toggleGameState("Day");
        // socket.broadcast("next_Round_change_screens" , "");
        res.status(200).end();
        //function to make all screens again to voting (socket for go to day again!)
    }


    static ResetRound(){
        VotingController.PlayersVoted = 0;

        VotingController.votingData.forEach((elem : any) => {
            elem.votes = 0;
            elem.votedBy = [];
            elem.voted = [];
            elem.width = "0vw"
        })
    }

    
    static  CreateHistoryData(req : Request , res : Response){

        // var currentRound = InfoController.getRound();
        var currentRound = VotingController.round++;
        console.log(currentRound);


        //By group
        VotingController.votingData.forEach((elem : any) => {

            elem.history.ByRound.push({
                "round" : currentRound,
                "voted" : elem.voted,
                "votedBy" : elem.votedBy
            })

            elem.votedBy.forEach((elemVotedBy : any) => {

                var found = elem.history.ByChar.find((chars :any) => chars.name == elemVotedBy.name)
                if(found === undefined) {

                    elem.history.ByChar.push(
                        {"name" : elemVotedBy.name , "img" : elemVotedBy.img , "totalVotes": 1 , "rounds" : [currentRound]}
                    )

                    
                }else{
                    found.rounds.push(currentRound);
                    found.totalVotes = found.rounds.length;
                }
            })
        })


        setTimeout(() => {
            const socket = DIContainer.get(SocketsService);
            socket.broadcast("history_made" , VotingController.votingData)
            VotingController.ResetRound();
        } , 3000);

        if(res){
            res.status(200).end();
        }


    }

    public SomeoneHasToDie(req : Request , res : Response){
        var personToDie = VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes)[0];
        VotingController.votingData.splice(VotingController.votingData.indexOf(personToDie) , 1)

        InfoController.activePlayers--;

        const socket = DIContainer.get(SocketsService);
        
        if(InfoController.getGameState == "Day"){
            InfoController.descreaseRoleCounter(personToDie.role.name)
        }

        personToDie.deathState = InfoController.getGameState;
        InfoController.toggleGameState("Night");
        InfoController.pushDeadPerson(personToDie);
        socket.broadcast("on_death" , personToDie);
        socket.broadcast("deletion_made" , VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes));
        socket.broadcast("on_active_players_change" , InfoController.activePlayers);
        res.status(200).end();
    }


    public removeVote(req : Request , res : Response){

        var body = req.body;
        if(body.name == undefined || body.vote == undefined) res.send(315).send({"message":"Incomplete body"});



        //Delete from vote of the voter
        console.log(body);
        VotingController.votingData.find((elem : any) => elem.char.name == body.name).voted = [];
        

        //Delete from votedBy of the votee
        var personToDelete = VotingController.votingData.find((elem : any) => elem.char.name == body.vote)
                                .votedBy.find((elem :any) => elem.name == body.name);

        var index = VotingController.votingData.find((elem: any) => elem.char.name == body.vote).votedBy.indexOf(personToDelete);
        VotingController.votingData.find((elem: any) => elem.char.name == body.vote).votedBy.splice(index , 1);
        VotingController.votingData.find((elem: any) => elem.char.name == body.vote).votes--;
        VotingController.votingData.find((elem: any) => elem.char.name == body.vote).width = 
                `${(VotingController.votingData.find((elem: any) => elem.char.name == body.vote).votes / VotingController.Players) * 100}vw`

        VotingController.PlayersVoted--;
        const socket = DIContainer.get(SocketsService);
        

        socket.broadcast("voting_on_change" , VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes));
        res.status(200).send({"message":"Deletetion Completed"})
        
    }


    public getVotingData(req: Request , res:Response){
        // console.log("Returning Voting Data");
        var newDataSorted = VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes)
        // console.log(newDataSorted);
        res.status(200).send(newDataSorted);
    }

    static setData(data :any){
        VotingController.votingData = data;
        VotingController.Players = data.length;
        InfoController.activePlayers = data.length
        // console.log('%c Got voting data from init controller' , 'color:green');
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("change_screens" , "");
        setTimeout(() => {
            socket.broadcast("on_active_players_change" , InfoController.activePlayers);
        } , 500);
    }

    public votePlayer(req: Request , res:Response){
        var body = req.body;
        if(body.name == undefined || body.vote == undefined) res.send(315).send({"message":"Incomplete body"});
        var voter;
        var votee;
        // console.log(VotingController.votingData)
        for(var i = 0; i < VotingController.votingData.length; i++){
            if(VotingController.votingData[i].char.name == body.name){
                voter = i 
            }else if(VotingController.votingData[i].char.name == body.vote){
                votee = i
            }
        }

        VotingController.votingData[votee].votes = VotingController.votingData[votee].votes + 1;
        VotingController.votingData[votee].votedBy.push(VotingController.votingData[voter].char);
        VotingController.votingData[votee].width = `${(VotingController.votingData[votee].votes / VotingController.Players) * 100}vw`

        VotingController.votingData[voter].voted.push(VotingController.votingData[votee].char);


        const socket = DIContainer.get(SocketsService);

        socket.broadcast("voting_on_change" , VotingController.votingData.sort((a :any, b:any) => b.votes - a.votes));
        
        VotingController.PlayersVoted++;

        if(VotingController.PlayersVoted == VotingController.votingData.length) {
            VotingController.CreateHistoryData(undefined , undefined);
            VotingController.PlayersVoted = 0;
            socket.broadcast("end_Round" , "");
        }
        res.status(200).send({"message":"Voting Completed" , "debug" : VotingController.PlayersVoted})
    }



    public setVotingData(req: Request, res:Response){
        VotingController.votingData = req.body;
        res.status(200).send(VotingController.votingData);
    }



}