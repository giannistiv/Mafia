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
import { MobileComponent } from './mobile/mobile.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { MobileBodyComponent } from './mobile-body/mobile-body.component';
import { MobileBottomComponent } from './mobile-bottom/mobile-bottom.component';
import { MobilePhaseComponent } from './mobile-phase/mobile-phase.component';
import { MobileInitComponent } from './mobile-init/mobile-init.component';
import { CemeterypopupComponent } from './cemeterypopup/cemeterypopup.component';
import { GraphpieComponent } from './graphpie/graphpie.component';
import { WastedComponent } from './wasted/wasted.component';
import { HanduiComponent } from './handui/handui.component';
import { WallbackgroundComponent } from './wallbackground/wallbackground.component';
import { SmarttvComponent } from './smarttv/smarttv.component';
import { PlayerschoiceComponent } from './playerschoice/playerschoice.component';
import { WallComponent } from './wall/wall.component';
import { MobileInit2Component } from './mobile-init2/mobile-init2.component';

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
    MobileInitComponent,
    LivevotingHeaderComponent,
    CemeterypopupComponent,
    GraphpieComponent,
    WastedComponent,
    HanduiComponent,
    WallbackgroundComponent,
    SmarttvComponent,
    PlayerschoiceComponent,
    MobileInit2Component,
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
