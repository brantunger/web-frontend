import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { ExpandCollapseComponent } from './components/expand-collapse/expand-collapse.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsContainerComponent } from './components/news-card/news-container/news-container.component';
import { ShoutBoxComponent } from './components/shout-box/shout-box.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
// import { AuthenticationInterceptor } from './authentication-interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CreateNewsDialogComponent } from './components/create-news-dialog/create-news-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FullFormattedTimestampPipe } from './pipes/full-formatted-timestamp.pipe';
import { NoSantizingHtmlPipe } from './pipes/no-santizing-html.pipe';
import { websocketMessagingServiceFactory } from './services/rx-stomp-service-factory';
import { WebsocketMessagingService } from './services/websocket-messaging.service';
import { BottomFooterComponent } from './components/bottom-footer/bottom-footer.component';

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
    NewsPageComponent,
    FullFormattedTimestampPipe,
    BottomFooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
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
  providers: [
    {
      provide: WebsocketMessagingService,
      useFactory: websocketMessagingServiceFactory,
    }
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthenticationInterceptor,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
