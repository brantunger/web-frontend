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
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ShoutBoxComponent } from './components/shout-box/shout-box.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsContainerComponent } from './components/news-card/news-container/news-container.component';
// import { AuthenticationInterceptor } from './authentication-interceptor';
import { NoSantizingHtmlPipe } from './pipes/no-santizing-html.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateNewsDialogComponent } from './components/create-news-dialog/create-news-dialog.component';
import { MarkdownHelpComponent } from './components/create-news-dialog/markdown-help/markdown-help.component';


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
    PageNotFoundComponent,
    HomePageComponent,
    CreateNewsDialogComponent,
    MarkdownHelpComponent
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
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthenticationInterceptor,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
