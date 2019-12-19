import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import { resolve } from 'dns';
import { InitController } from '../initController/init.controller';

export class InfoController {

    static players : any = [];
    static alive : any = [];
    static dead : any = [];
    static died_last : any;
    static round : any = 1;
    static activePlayers = 0;
    static activeRoles : any = [];

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .post('/initactiveplayers' , this.setAliveData)
            .get('/activeplayers' , this.getAliveData)
            .post('/addlastdead' , this.setLastDead)
            .get('/lastdead' , this.getLastDead)
            .post('/initdeadplayers' , this.setDeadData)
            .get('/deadplayers' , this.getDeadData)
            .post('/addround' , this.addRound)
            .get('/round' , this.getRound)
            .get('/getactiveplayerscounter' , this.getActivePlayersCounter)
            .get('/getrolesinfo' , this.getActiveRoles)
        return router;
    }



    public getActiveRoles(req: Request , res : Response){
        res.status(200).send(InfoController.activeRoles)
    }

    static descreaseRoleCounter(rolename : any){
        InfoController.activeRoles.filter((elem : any)=> elem.name == rolename).counter--;
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("on_roles_change" , InfoController.activeRoles);
    }


    static setActiveRoles(rolesObject :any){
        InfoController.activeRoles = rolesObject;
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("on_roles_change" , InfoController.activeRoles);

    }


    public getActivePlayersCounter(req : Request, res:Response){
        res.status(200).send(InfoController.activePlayers);
    }



    public addRound(req: Request , res:Response){
        InfoController.round++;
        const socket = DIContainer.get(SocketsService);
        socket.broadcast("round" , InfoController.round);
        res.status(200).send({"message":"Round number"})
    }

    public getRound(req: Request , res:Response){
        res.status(200).send(InfoController.round);
    }

    public setAliveData(req: Request , res:Response){
        InfoController.players = req.body;
        InfoController.alive.remove();
        console.log("Alive:");
        for(var i = 0; i < InfoController.players.length; i++){
            if(InfoController.players[i].alive == true){
                InfoController.alive.push(InfoController.players[i]);               
                console.log(InfoController.alive.name) 
            }else {
                InfoController.dead.push(InfoController.players[i]);
            }
        }

        const socket = DIContainer.get(SocketsService);
        socket.broadcast("alive" , InfoController.alive);
        res.status(200).send({"message":"These are the alive players"})
    }

    public getDeadData(req: Request , res:Response){
        console.log("Returning Dead Players");
        res.status(200).send(InfoController.dead);
    }

    public setDeadData(req: Request , res:Response){
        InfoController.players = req.body;
        InfoController.dead.remove();
        console.log("Alive:");
        for(var i = 0; i < InfoController.players.length; i++){
            if(InfoController.players[i].alive == true){
                InfoController.alive.push(InfoController.players[i]);               
                console.log(InfoController.alive.name) 
            }else {
                InfoController.dead.push(InfoController.players[i]);
            }
        }

        const socket = DIContainer.get(SocketsService);
        socket.broadcast("dead" , InfoController.dead);
        res.status(200).send({"message":"These are the dead players"})
    }

    public getAliveData(req: Request , res:Response){
        console.log("Returning Active Players");
        res.status(200).send(InfoController.alive);
    }

    public getLastDead(req: Request, res:Response){
        console.log("Returning Player that died last");
        res.status(200).send(InfoController.died_last);
    }

    static pushDeadPerson(person : any){
        InfoController.dead.push(person);
        InfoController.setLastDeadPerson(person);
    }


    static setLastDeadPerson(person : any){
        InfoController.died_last = person;
    }

    public setLastDead(req: Request, res:Response){
        InfoController.died_last = req.body
        res.status(200).send(InfoController.died_last);
    }
}