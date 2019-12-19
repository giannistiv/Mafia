import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import { resolve } from 'dns';
import { VotingController } from '../votingController/voting.controller';
import { InfoController } from '../infoController/info.controller';

export class InitController {



    static iconAvailability = [
        {"name": "Deadpool" , "img" : "assets/avatars/deadpool.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/batman.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/luigi.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/ironman.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/mario.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/pikachu.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/sonic.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/spiderman.png" , "available" : true},
        {"name": "Deadpool" , "img" : "assets/avatars/spongebob.png" , "available" : true},
    ]


    static charactersMapping = [
        {"name" : "Batman" , "img" : "assets/avatars/batman.png" , "color" : "grey" , "available":true},
        {"name" : "Deadpool" , "img" : "assets/avatars/deadpool.png" , "color" : "red", "available":true},
        {"name" : "Luigi" , "img" : "assets/avatars/luigi.png" , "color" : "green", "available":true},
        {"name" : "Iron Man" , "img" : "assets/avatars/ironman.png" , "color" : "orange", "available":true},
        {"name" : "Mario" , "img" : "assets/avatars/mario.png" , "color" : "red", "available":true},
        {"name" : "Pikachu" , "img" : "assets/avatars/pikachu.png" , "color" : "yellow", "available":true},
        {"name" : "Sonic" , "img" : "assets/avatars/sonic.png" , "color" : "blue", "available":true},
        {"name" : "Spiderman" , "img" : "assets/avatars/spiderman.png" , "color" : "white", "available":true},
        {"name" : "Spongebob" , "img" : "assets/avatars/spongebob.png" , "color" : "yellow", "available":true},
    ]



    

    static initRoles = [
        {"name" : "Detective" ,  "counter" : 0 , "toBeAssigned" : 2 , "role" : {
            "name" : "Detective",
            "img" : "assets/roles/detective.png",
            "info" : "someinfo",
            "ability" : "Τhe Detective can detect whether a player is a mafioso or not once every round"
        }},
        {"name" : "Doctor" ,  "counter" : 0 , "toBeAssigned" : 1 , "role" : {
            "name" : "Doctor",
            "img" : "assets/roles/doctor.png",
            "info" : "someinfo",
            "ability" : "The Doctor can save a random person during the night, if the mafia killed him"
        }},
        {"name" : "Masons" ,  "counter" : 0 , "toBeAssigned" : 3 , "role" : {
            "name" : "Masones",
            "img" : "assets/roles/masons.png",
            "info" : "Masons can recognize each other.",
            "ability" : "Masons can recognize each other."
        }},
        {"name" : "Barman" ,  "counter" : 0 , "toBeAssigned" : 2 , "role" : {
            "name" : "Barman",
            "img" : "assets/roles/barman.png",
            "info" : "some info",
            "ability" : "The Barman may anonymously cancel the effect of another role's ability every night"
        }},
        {"name" : "Godfather" ,  "counter" : 0 , "toBeAssigned" : 1, "role" : {
            "name" : "Godfather",
            "img" : "assets/roles/godfather.png",
            "info" : "SomeInfo",
            "ability" : "The Godfather will be identified by the detective as innocent"
        }},
    ]

    static currentAddedPlayers = 0;

    static playerChoises : JSON[] = []

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .get('/availableicons' , this.getAvailableIcons)
            .get('/players' , this.getPlayers)
            .post('/addplayer' , this.addPlayer)
            .get('/startgame' , this.startGame)
            .post("/reserveicon" , this.reserveIcon)
            .post("/unreserveicon" , this.unreserveIcon)
            .get("/randomrole" , this.getRandomRole)

        return router;
    }

    public getAvailableIcons(req: Request, res: Response){
        console.log(InitController.charactersMapping);
        var returnValue = InitController.charactersMapping;
        res.status(200).send(returnValue);
    }


    public addPlayer(req: Request, res: Response){
        var body = req.body;
        
        for(var i = 0; i < InitController.charactersMapping.length; i++){
            if(InitController.charactersMapping[i].name == body.char.name){
                body.char.img = InitController.charactersMapping[i].img;
                body.char.color = InitController.charactersMapping[i].color;
                InitController.charactersMapping[i].available = false;
            }
        }
            
        //TODO add random role to player Added!

        
        console.log("Adding Player" , body);
        InitController.playerChoises.push(body);

        //Sending a broadcast message to all clients
        const socketService = DIContainer.get(SocketsService);
        socketService.broadcast("icons_on_change", InitController.charactersMapping);
        res.status(200).send({ "message":"Adding Player" , "data":body});
    }

    public getPlayers(req: Request , res: Response){
        res.status(200).send(InitController.playerChoises);
    }

    public startGame(req: Request , res: Response){
        
        const socket = DIContainer.get(SocketsService);


        socket.broadcast("start_game" , "");
        console.log(InitController.currentAddedPlayers , "players");
        var votingInterval = setInterval(() => {
            if(InitController.playerChoises.length == InitController.currentAddedPlayers){
                VotingController.setData(InitController.playerChoises)
                InfoController.setActiveRoles(InitController.initRoles)
                clearInterval(votingInterval);
            }
        } , 500);
        res.status(200).end();

    }


    public getRandomRole(req : Request , res : Response){

        var availableRoles = InitController.initRoles.filter((elem) => elem.toBeAssigned > 0)
        console.log(availableRoles);
        var roleToBeAssigned = availableRoles[Math.floor(Math.random()*availableRoles.length)]
        roleToBeAssigned.toBeAssigned--;
        roleToBeAssigned.counter++;
        res.status(200).send(roleToBeAssigned);
        if(roleToBeAssigned.name == "Barman"){
            roleToBeAssigned.role.name = "Barman 1"
        }

        
    }


    static removeRandomRole(rolename : any){

        var role :any = InitController.initRoles.filter((elem) => elem.name == rolename)
        role.toBeAssigned++;
        role.counter++;

    }

    public reserveIcon(req: Request , res:Response){
        InitController.charactersMapping.forEach((icon) => {
            if(icon.img == req.body.img){
                icon.available = false;
                InitController.currentAddedPlayers++;
                const socketService = DIContainer.get(SocketsService);
                socketService.broadcast("activate_players_on_change" , InitController.currentAddedPlayers);
                socketService.broadcast("icons_on_change", InitController.charactersMapping);
            }
        })

        res.status(200).send();       
    }


    public unreserveIcon(req : Request , res:Response){
        InitController.charactersMapping.forEach((icon) => {
            if(icon.img == req.body.img){
                icon.available = true;
                InitController.removeRandomRole(req.body.role);
                InitController.currentAddedPlayers--;
                const socketService = DIContainer.get(SocketsService);
                socketService.broadcast("activate_players_on_change" , InitController.currentAddedPlayers);
                socketService.broadcast("icons_on_change", InitController.charactersMapping);
            }
        })

        res.status(200).send();
    }
}