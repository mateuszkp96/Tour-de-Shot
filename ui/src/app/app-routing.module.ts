import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './footer/team/team.component';
import { ContactComponent } from './footer/contact/contact.component';
import { PrivacyComponent } from './footer/privacy/privacy.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { RouteComponent } from './route/route.component';
import { AccountPrivacyComponent } from './account-privacy/account-privacy.component';
import { AccountGeneralComponent } from './account-general/account-general.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'team', component: TeamComponent},
  {path: 'search', component: SearchComponent},
  { path: 'account', component: AccountComponent,
    children: [
      { path: 'account-general', component: AccountGeneralComponent},
      { path: 'account-privacy', component: AccountPrivacyComponent},
    ]
  },
  { path: 'route', component: RouteComponent},

  {path: 'map', component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, HomeComponent,PrivacyComponent,ContactComponent,TeamComponent,
  SearchComponent]
