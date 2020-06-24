import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LogoutComponent } from '../logout/logout.component';

@NgModule({
  declarations: [LogoutComponent],
  exports: [LogoutComponent],
  bootstrap: [LogoutComponent]
})
export class NavModule {}
