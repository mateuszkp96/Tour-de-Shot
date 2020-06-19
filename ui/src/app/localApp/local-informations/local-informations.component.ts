import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDetailed } from 'src/app/models/LocalDetailed';
import { WebLocalService } from 'src/app/services/web-local.service';

@Component({
  selector: 'app-local-informations',
  templateUrl: './local-informations.component.html',
  styleUrls: ['./local-informations.component.css']
})
export class LocalInformationsComponent implements OnInit {

  @Input() localId: number
  local: LocalDetailed

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,

  ) { }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet

    console.log(this.localId)
    this.getLocal(this.localId)    //todo: changing to appropriate local
  }

  getLocal(id: number){
    this.webLocalService.getLocalById(id).then(local=>
      this.local = local)
  }

  onModifyClick(){
    console.log("Modify contact data not active yet")
  }

}
