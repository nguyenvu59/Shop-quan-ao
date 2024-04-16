import { Component, OnInit} from '@angular/core';
import { faBars, faHeart, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faUser=faUser;
  faSearch=faSearch;
  faHeart=faHeart;
  faShoppingCart=faShoppingCart;
  faBars=faBars;

  ngOnInit(): void {
    initFlowbite();
  }

  onActivate(event: any) { 
    document.getElementsByClassName('overflow-y-auto')[0].scrollTo(0, 0);
  }
}
