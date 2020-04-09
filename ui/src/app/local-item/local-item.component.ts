import { Component, OnInit, Input } from '@angular/core';
import { Local } from '../models/Local';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';

@Component({
  selector: 'app-local-item',
  templateUrl: './local-item.component.html',
  styleUrls: ['./local-item.component.css']
})
export class LocalItemComponent implements OnInit {

  @Input() local: Local;
  localsList: Local[];

  constructor() {}

  ngOnInit(): void {
  }
  
}
