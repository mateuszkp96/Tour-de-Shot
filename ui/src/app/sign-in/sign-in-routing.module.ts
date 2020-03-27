/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { SignInModule } from './sign-in.module';
import { SearchComponent } from '../search/search.component';

const routesSignIn: Routes = [
  {path: 'signin/search', component: SearchComponent},
];

@NgModule({
  imports: [SignInModule, RouterModule.forChild(routesSignIn)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
