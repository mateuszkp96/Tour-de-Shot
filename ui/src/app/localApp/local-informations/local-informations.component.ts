import {Component, OnInit, Input, AfterViewInit, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDetailed} from 'src/app/models/LocalDetailed';
import {WebLocalService} from 'src/app/services/web-local.service';

@Component({
  selector: 'app-local-informations',
  templateUrl: './local-informations.component.html',
  styleUrls: ['./local-informations.component.css']
})
export class LocalInformationsComponent implements OnInit {

  @Input() localId: number
  local: LocalDetailed
  isDisable: boolean

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
  ) {
  }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet

    console.log(this.localId)
    this.getLocal(this.localId)  //todo: changing to appropriate local

    this.isDisable = true
  }


  getLocal(id: number) {
    this.webLocalService.getLocalById(id).then(l => {
      this.local = l
    })
  }
  
  onModifyClick() {
    this.isDisable = false
  }

  onSaveClick() {
    this.isDisable = true
    console.log("Local to save")
    console.log(this.local)
    // todo: save with service
    this.getLocal(this.localId)
  }

  onCancelClick() {
    this.isDisable = true
    this.getLocal(this.localId)
  }

}
