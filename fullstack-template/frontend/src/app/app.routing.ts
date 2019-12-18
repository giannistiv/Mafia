import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmarttableComponent } from 'src/app/smarttable/smarttable.component';
import { MobileComponent } from 'src/app/mobile/mobile.component';
import { MobileInitComponent } from 'src/app/mobile-init/mobile-init.component';
import { MobileHistoryComponent } from 'src/app/mobile-history/mobile-history.component';
import { WallComponent } from './wall/wall.component';
import { WallInitComponent } from './wall-init/wall-init.component';
import { PlayerschoiceComponent } from './playerschoice/playerschoice.component';
import { SmarttvComponent } from './smarttv/smarttv.component';
import { BackendTesterComponent } from './backend-tester/backend-tester.component';
import { PlayerhistoryComponent } from './playerhistory/playerhistory.component';
import { VirtualComponent } from './cursor/virtual/virtual.component';

const routes: Routes = [
  { path: 'backend' , component: BackendTesterComponent},
  { path: 'virtual' , component:VirtualComponent},
  { path: 'mobile' , component: MobileComponent},
  { path: 'mobile-init' , component: MobileInitComponent},
  { path: 'mobile-history' , component: MobileHistoryComponent},
  { path: 'wall' , component: WallComponent},
  { path: 'wall-init' , component: WallInitComponent},
  { path: 'playerhistory' , component: PlayerhistoryComponent},
  { path: 'nightkilling' , component: PlayerschoiceComponent},
  { path: 'smarttv' , component: SmarttvComponent },
  { path: 'smarttable' , component: SmarttableComponent},
  { path: 'wall' , component: WallComponent},
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
