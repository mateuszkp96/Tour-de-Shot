import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents} from '../app-routing.module';
import { SearchComponent } from '../search/search.component';
import { AppComponent } from '../app.component';
import { SignInNavComponent } from '../sign-in-nav/sign-in-nav.component';


@NgModule({
  declarations: [
    SignInNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInNavComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SignInModule { }
