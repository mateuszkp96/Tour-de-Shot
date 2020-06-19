import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-cookies-privacy',
  templateUrl: './cookies-policy.component.html'
})
export class CookiesPolicyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CookiesPolicyComponent)
  { }

  ngOnInit(): void {
  }

}
