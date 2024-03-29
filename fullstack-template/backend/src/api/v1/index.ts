import * as express from 'express';
import { ResourceController } from '../shared';
import { ITask, TaskModel } from '@app/models';
import { FilesController } from './files/files.controller';
import { SocketEventsController } from './socket-events/socket-events.controller';
import { ExampleController } from './example/example.controller';
import { InitController } from './initController/init.controller'
import { VotingController } from './votingController/voting.controller'
import { InfoController } from './infoController/info.controller'

const apiV1Router = express.Router();


apiV1Router
  // Sockets events routes
  .use(
    '/socket-events',
    new SocketEventsController().applyRoutes()
  )

  // Sockets events routes
  .use(
    '/files',
    new FilesController().applyRoutes()
  )

  // Task routes
  .use(
    '/tasks',
    new ResourceController<ITask>(TaskModel).applyRoutes()
  )

  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  )


  .use(
    '/initprocedure',
    new InitController().applyRoutes()
  )

  .use(
    '/voting',
    new VotingController().applyRoutes()
  )

  .use(
    '/info',
    new InfoController().applyRoutes()
  )


export { apiV1Router };

