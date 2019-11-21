import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmarttableComponent } from 'src/app/smarttable/smarttable.component'
import { MobileComponent } from 'src/app/mobile/mobile.component'
import { MobileInitComponent } from 'src/app/mobile-init/mobile-init.component'
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  { path: 'mobile' , component: MobileComponent},
  { path: 'mobile-init' , component: MobileInitComponent},
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
