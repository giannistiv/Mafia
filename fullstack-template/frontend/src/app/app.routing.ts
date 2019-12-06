import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmarttableComponent } from 'src/app/smarttable/smarttable.component'
import { SmarttvComponent } from './smarttv/smarttv.component';
import { PlayerschoiceComponent } from './playerschoice/playerschoice.component';
import { PlayerhistoryComponent } from './playerhistory/playerhistory.component';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  { path: 'wall' , component: WallComponent},
  { path: 'playerhistory' , component: PlayerhistoryComponent},
  { path: 'nightkilling' , component: PlayerschoiceComponent},
  { path: 'smarttv' , component: SmarttvComponent },
  { path: 'smarttable' , component: SmarttableComponent},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
