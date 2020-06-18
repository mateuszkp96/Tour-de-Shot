import { Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Local } from '../models/Local';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit {

  @Input() local: Local

  constructor(@Inject(MAT_DIALOG_DATA) public data: PrivacyComponent)
  { }

  ngOnInit(): void {

  }


}
