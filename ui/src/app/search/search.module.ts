import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents} from '../app-routing.module';
import { SearchComponent } from '../search/search.component';
import { AppComponent } from '../app.component';
import { SignInNavComponent } from '../sign-in-nav/sign-in-nav.component';
import { LocalItemComponent } from '../local-item/local-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SearchComponent,
    LocalItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule
  ]

})
export class SearchModule {}
