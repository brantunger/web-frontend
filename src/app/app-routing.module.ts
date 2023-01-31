import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { CreateNewsPageComponent } from './components/create-news-page/create-news-page.component';
import { AuthorizationGuardService } from './services/authorization-guard.service';
import { AuthFailedComponent } from './components/auth-failed/auth-failed.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Dreadfall' },
  {
    path: 'news/create',
    canActivate: [AuthorizationGuardService],
    component: CreateNewsPageComponent,
    title: 'Dreadfall | Create News'
  },
  { path: 'news/:id', component: NewsPageComponent },
  { path: 'auth', component: AuthFailedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
