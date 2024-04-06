import { Component, OnInit } from '@angular/core';
import { faGripVertical, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  faGripVertical=faGripVertical;
  faList=faList
  constructor() { }

  ngOnInit(): void {
  }

}
