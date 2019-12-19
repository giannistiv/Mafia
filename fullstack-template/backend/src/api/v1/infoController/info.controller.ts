import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import { resolve } from 'dns';

export class InfoController {

    static players : any = [];
    static alive : any = [];
    static dead : any = [];
    static died_last : any;
    static round : any = 1;

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
        return router;
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
        res.status(200).send(InfoController.players);
    }

    public setLastDead(req: Request, res:Response){
        InfoController.died_last = [];
        InfoController.died_last.push(req.body);
        res.status(200).send(InfoController.died_last);
    }
}