import { Component, OnInit, Input, Inject } from '@angular/core';
import { Local } from '../models/Local';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() local: Local
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalComponent) { }

  ngOnInit(): void {
  }

}
