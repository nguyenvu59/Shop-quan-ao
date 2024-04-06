import { Component } from '@angular/core';
import { faBars, faHeart, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUser=faUser;
  faSearch=faSearch;
  faHeart=faHeart;
  faShoppingCart=faShoppingCart;
  faBars=faBars;
}
