import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { AuthenticationInterceptor } from './authentication-interceptor';
import { NoSantizingHtmlPipe } from './pipes/no-santizing-html.pipe';
import { CreateNewsComponent } from './create-news/create-news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';


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
    NewsContainerComponent,
    NoSantizingHtmlPipe,
    CreateNewsComponent,
    PageNotFoundComponent,
    HomePageComponent
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
    MatTooltipModule,
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
