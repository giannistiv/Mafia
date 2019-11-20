import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SmarttvComponent } from './smarttv.component';

@NgModule({
  declarations: [
    SmarttvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [SmarttvComponent]
})
export class SmarttvModule { }
