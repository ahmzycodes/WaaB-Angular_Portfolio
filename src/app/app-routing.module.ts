import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostFormComponent} from "./post-form/post-form.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },  { path: 'about', component: AboutComponent },
  { path: 'post', component: PostFormComponent,  canActivate: [AuthGuard] }, //Guard
  { path: 'post/new', component: PostFormComponent,  canActivate: [AuthGuard] }, //Guard
  { path: 'post/edit/:id', component: PostFormComponent,  canActivate: [AuthGuard] }, //Guard
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] }, //Guard
  { path: '**', redirectTo: '', pathMatch: 'full' }//my Wildcard for 404, not found.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
