import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent  implements OnInit {

  isSelectTab:string="";

  constructor() { }

  ngOnInit() {
    this.selectTab('user');
  }

  selectTab(type:string) {
    this.isSelectTab = type;
  }      

}
