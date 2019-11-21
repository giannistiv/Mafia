import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SmarttableComponent } from './smarttable/smarttable.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { AvatarIconComponent } from './avatar-icon/avatar-icon.component';
import { GraphRowComponent } from './graph-row/graph-row.component';
import { AvatarsListComponent } from './avatars-list/avatars-list.component';
import { VoteBoxComponent } from './vote-box/vote-box.component';
import { LivevotingHeaderComponent } from './livevoting-header/livevoting-header.component';
import { WallComponent } from './wall/wall.component';
import { MobileComponent } from './mobile/mobile.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { MobileBodyComponent } from './mobile-body/mobile-body.component';
import { MobileBottomComponent } from './mobile-bottom/mobile-bottom.component';
import { MobilePhaseComponent } from './mobile-phase/mobile-phase.component';
import { MobileInitComponent } from './mobile-init/mobile-init.component';

@NgModule({
  declarations: [
    AppComponent,
    SmarttableComponent,
    BackgroundImageComponent,
    AvatarIconComponent,
    GraphRowComponent,
    AvatarsListComponent,
    VoteBoxComponent,
    LivevotingHeaderComponent,
    WallComponent,
    MobileComponent,
    MobileHeaderComponent,
    MobileBodyComponent,
    MobileBottomComponent,
    MobilePhaseComponent,
    MobileInitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
