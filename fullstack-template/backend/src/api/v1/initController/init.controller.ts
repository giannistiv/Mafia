import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';

export class InitController {

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .get('/availableicons' , this.getAvailableIcons)
            .post('/addplayer' , this.addPlayer);

        return router;
    }

    public getAvailableIcons(req: Request, res: Response){
        res.status(200).send('Getting available Icons');
    }


    public addPlayer(req: Request, res: Response){
        res.status(200).send('Adding Player');
    }


}