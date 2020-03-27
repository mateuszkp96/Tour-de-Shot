import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents} from '../app-routing.module';
import { SearchComponent } from '../search/search.component';
import { AppComponent } from '../app.component';
import { SignInComponent } from './sign-in.component';


@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [SignInComponent]
})
export class SignInModule { }
