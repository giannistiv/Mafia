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
import { CemeterypopupComponent } from './cemeterypopup/cemeterypopup.component';
import { GraphpieComponent } from './graphpie/graphpie.component';
import { WastedComponent } from './wasted/wasted.component';
import { HanduiComponent } from './handui/handui.component';
import { WallbackgroundComponent } from './wallbackground/wallbackground.component';
import { SmarttvComponent } from './smarttv/smarttv.component';
import { PlayerschoiceComponent } from './playerschoice/playerschoice.component';
import { PlayerhistoryComponent } from './playerhistory/playerhistory.component';

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
    CemeterypopupComponent,
    GraphpieComponent,
    WastedComponent,
    HanduiComponent,
    WallbackgroundComponent,
    SmarttvComponent,
    PlayerschoiceComponent,
    PlayerhistoryComponent
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
