import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in-nav',
  templateUrl: './sign-in-nav.component.html',
  styleUrls: ['./sign-in-nav.component.css']
})
export class SignInNavComponent implements OnInit {

  @Output()
  toggleBtnClickedEmmiter = new EventEmitter();

  constructor()
  {
  }

  ngOnInit(): void {
  }

 toggleBtnClicked() {
    this.toggleBtnClickedEmmiter.emit();
  }


}
