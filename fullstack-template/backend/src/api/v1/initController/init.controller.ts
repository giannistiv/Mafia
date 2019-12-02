import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';

export class InitController {


    static iconAvailability = [
        {"img" : "assets/avatars/deadpool.png" , "available" : true},
        {"img" : "assets/avatars/batman.png" , "available" : true},
        {"img" : "assets/avatars/bear.png" , "available" : true},
        {"img" : "assets/avatars/ironman.png" , "available" : true},
        {"img" : "assets/avatars/mario.png" , "available" : true},
        {"img" : "assets/avatars/pikachu.png" , "available" : true},
        {"img" : "assets/avatars/sonic.png" , "available" : true},
        {"img" : "assets/avatars/randomface.png" , "available" : true},
        {"img" : "assets/avatars/spiderman.png" , "available" : true},
        {"img" : "assets/avatars/zelda.png" , "available" : true},
        {"img" : "assets/avatars/spongebob.png" , "available" : true},
    ]


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
            .post('/addplayer' , this.addPlayer);

        return router;
    }

    public getAvailableIcons(req: Request, res: Response){
        console.log(InitController.iconAvailability);
        var returnValue = InitController.iconAvailability;
        res.status(200).send(returnValue);
    }


    public addPlayer(req: Request, res: Response){
        var body = req.body;
        console.log("Adding Player" , req.body);
        InitController.playerChoises.push(body);

        //Sending a broadcast message to all clients
        const socketService = DIContainer.get(SocketsService);
        
        InitController.iconAvailability.forEach((elem) => {
            if(elem.img == body.img){
                elem.available = false;
                
            }
        })
        socketService.broadcast("icons_on_change", InitController.iconAvailability);
        res.status(200).send({ "message":"Adding Player" , "data":req.body});
    }

    public getPlayers(req: Request , res: Response){
        res.status(200).send(InitController.playerChoises);
    }
}