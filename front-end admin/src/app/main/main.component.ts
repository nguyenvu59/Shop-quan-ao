import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    private readonly route: ActivatedRoute,
    private readonly titleService: Title
  ) {
  
   }

  ngOnInit(): void {
    this.nameHeader = this.titleService.setTitle(this.route.snapshot.data['title'])
    console.log('this.nameHeader :', this.nameHeader);
  }

  selectMenu() {
   
  }

}
