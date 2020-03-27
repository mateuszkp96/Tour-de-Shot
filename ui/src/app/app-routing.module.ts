import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './footer/team/team.component';
import { ContactComponent } from './footer/contact/contact.component';
import { PrivacyComponent } from './footer/privacy/privacy.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'team', component: TeamComponent},
  {path: 'search', component: SearchComponent},

  {path: 'signin', component: SignInComponent,
    children: [
      { path: 'search', component: SearchComponent},
      { path: 'search', component: SearchComponent},
      { path: 'search', component: SearchComponent},
      
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, HomeComponent,PrivacyComponent,ContactComponent,TeamComponent,
  SignInComponent,SearchComponent]
