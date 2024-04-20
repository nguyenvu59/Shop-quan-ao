import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  nameHeader: any = "";
  constructor(
    private readonly route: ActivatedRoute
  ) {
    console.log('route :', route);

   }

  ngOnInit(): void {
    
  }

  selectMenu() {
    console.log('this.route.snapshot.routeConfig?.title :', this.route.snapshot.routeConfig?.title);
    let currentRoute:any  = this.route.root.children;
    this.nameHeader = currentRoute.snapshot.routeConfig?.title
    console.log('this.nameHeader :', this.nameHeader);
  }

}
