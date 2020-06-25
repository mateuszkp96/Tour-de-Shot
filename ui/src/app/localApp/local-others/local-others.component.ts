import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {WebLocalService} from 'src/app/services/web-local.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-local-others',
  templateUrl: './local-others.component.html',
  styleUrls: ['./local-others.component.css']
})
export class LocalOthersComponent implements OnInit {

  @Input() localId: number;
  @Output() onLocalDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private webLocalService: WebLocalService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  onDeleteLocalClick() {
   // this.webLocalService.deleteLocalById(this.localId)
    this.webLocalService.deleteLocalById(this.localId).then(() => {
      console.log("LOCAL " + this.localId + " DELETED")
      this.onLocalDeleted.emit(true)
      this.router.navigate(['locals'])
    });

  }
}
