import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isOpen: boolean;
  product: any;
  constructor(private router : Router,
              private localService: LocalService) { }

  ngOnInit(): void {

  }

  categoryChecked(event: string[]) {
    this.localService.updateCheckedCategories(event)
  }


}
