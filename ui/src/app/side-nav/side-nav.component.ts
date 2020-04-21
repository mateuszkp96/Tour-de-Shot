import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isOpen: boolean;
  product: any;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.isOpen = true;
    this.product = 'kot';
  }

  gotoDynamic() {
    //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    this.router.navigateByUrl('signin/search', { state: this.product });
  }

}
