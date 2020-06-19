import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-account-privacy',
  templateUrl: './account-privacy.component.html',
  styleUrls: ['./account-privacy.component.css']
})
export class AccountPrivacyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AccountPrivacyComponent)
  { }

  ngOnInit(): void {
  }

}
