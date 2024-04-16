import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent  implements OnInit {

  isSelectTab:string="";

  constructor() { }

  ngOnInit() {}

  selectTab(type:string) {
    this.isSelectTab = type;
  }      

}
