import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AlertBannerComponent } from './alert-banner/alert-banner.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpandCollapseComponent } from './expand-collapse/expand-collapse.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ShoutBoxComponent } from './shout-box/shout-box.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsContainerComponent } from './news-card/news-container/news-container.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    ShoutBoxComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    AlertBannerComponent,
    ExpandCollapseComponent,
    NewsCardComponent,
    NewsContainerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('access_token');
        }
      }
    })
  ],
  entryComponents: [LoginDialogComponent, SignupDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
