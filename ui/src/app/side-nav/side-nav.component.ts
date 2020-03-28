import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isOpen: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isOpen = true;
  }

  openNav() {


    document.getElementById("page-wrapper").classList.add('toggled');
    console.log("open");
  }

  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  openAndCloseNav() {
    switch (this.isOpen) {
      case true:
        document.getElementById("page-wrapper").classList.remove('toggled');
        this.isOpen = false;
        console.log("close");
        break;
      case false:
        document.getElementById("page-wrapper").classList.add('toggled');
        this.isOpen = true;
        console.log("open");
        break;
    }
  }
}
