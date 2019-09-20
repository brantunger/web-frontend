import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { MatButtonModule, MatCardModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShoutBoxComponent } from './shout-box/shout-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    ShoutBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
