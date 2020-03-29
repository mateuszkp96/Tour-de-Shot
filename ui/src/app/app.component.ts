import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `<app-sign-in-nav (toggleBtnClickedEmmiter)='onToggleBtnClicked($event)'></app-sign-in-nav>`
})
export class AppComponent {
  title = 'Tour de Shot';
  isLoggedIn = true;

  onToggleBtnClicked() {
    document.getElementById("wrapper").classList.toggle("menuHidden");
    console.log("open");
  }
}
