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
            "info" : "You are a veteran cop in your last year on the force. You have been hunting the Mafia for years \
            but they were always one step ahead. But not this time. It is up to you and the people of this town to capture \
            the Mafia once and for all.",
            "ability" : "Τhe Detective knows the all the mafiosi except for the Godfather. Try to hint on the killers but beware \
            if they find you you will be the first to go."
        }},
        {"name" : "Doctor" ,  "counter" : 0 , "toBeAssigned" : 1 , "role" : {
            "name" : "Doctor",
            "img" : "assets/roles/doctor.png",
            "info" : "There are always victims and there will be many more. But a job is a job and you will save \
            anyone that is trustworthy. Until the Mafia gets extinguished from this town, you will have to heal the \
            whomever you can and believe in, even yourself.",
            "ability" : "The Doctor can save someone during the night, if the mafia killed him, even himself. You have \
            this ability once so use it carefully."
        }},
        {"name" : "Masons" ,  "counter" : 0 , "toBeAssigned" : 3 , "role" : {
            "name" : "Masons",
            "img" : "assets/roles/masons.png",
            "info" : "Masons are secretive and hidden in the shadows. They blend in the crowds, hidden by their anonymity \
            and trusting only their own. But this anonimity may have to be lost in order to help this town in the upcoming \
            battle",
            "ability" : "Masons know each other. They seem like pawns in this grand game of chess, but with their \
            knowledge they know more than anyone else"
        }},
        {"name" : "Barman" ,  "counter" : 0 , "toBeAssigned" : 2 , "role" : {
            "name" : "Barman",
            "img" : "assets/roles/barman.png",
            "info" : "Barmen are a quit bunch. They hear the customers rumble on and on revealing even their most hidden \
            secrets. But this calm and collected exterior is not but a mask for people with the patience to learn all \
            about a person's past. And they know just the person to sell their secrets.",
            "ability" : "The Barman is a mafioso. They know the other members of the Mafia, but which of them is the Godfather? \
            Even they don't know."
        }},
        {"name" : "Godfather" ,  "counter" : 0 , "toBeAssigned" : 1, "role" : {
            "name" : "Godfather",
            "img" : "assets/roles/godfather.png",
            "info" : "You are the one king of this town. You have brought it to greatness and you will do everything to \
            keep it there. But this achievement may crumble if this Detective and the other vermin of this town \
            continue to search into your empire. It is time to assemble you team and finish them once and for all.",
            "ability" : "The Godfather remains hidden from the Detective. He knows the other Mafiosi and has to rely on them \
            to win the game. But if the people start to suspect him, he will have to drop the blame to someone else, even to one of his own"
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
            .post("/randomrole" , this.getRandomRole)

        return router;
    }

    public getAvailableIcons(req: Request, res: Response){
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("show_qr" , "");
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

        console.log(req.body.name)

        if(req.body.name == "Batman"){
            var availableRoles = InitController.initRoles.filter((elem) => elem.name === "Doctor")
            console.log(availableRoles);
            var roleToBeAssigned = availableRoles[Math.floor(Math.random()*availableRoles.length)]
            roleToBeAssigned.toBeAssigned--;
            roleToBeAssigned.counter++;
            res.status(200).send(roleToBeAssigned);
            
        }else if(req.body.name == "Mario"){
            var availableRoles = InitController.initRoles.filter((elem) => elem.name === "Barman")
            console.log(availableRoles);
            var roleToBeAssigned = availableRoles[Math.floor(Math.random()*availableRoles.length)]
            roleToBeAssigned.toBeAssigned--;
            roleToBeAssigned.counter++;
            res.status(200).send(roleToBeAssigned);
            
        }else if(req.body.name == "Luigi"){
            var availableRoles = InitController.initRoles.filter((elem) => elem.name === "Barman")
            console.log(availableRoles);
            var roleToBeAssigned = availableRoles[Math.floor(Math.random()*availableRoles.length)]
            roleToBeAssigned.toBeAssigned--;
            roleToBeAssigned.counter++;
            roleToBeAssigned.role.name = "Barman 1"
            res.status(200).send(roleToBeAssigned);
            
        }else{
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