import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  user: any = {};
  token: string | null = '';
  constructor(
    private router: Router,
    private _storageService: StorageService,
  ) {

  }

  ngOnInit(): void {
    this.user = this._storageService.getUser();
  }

  logout() {  
    this._storageService.signOut();
    this.token = this._storageService.getToken();
    this.user = this._storageService.getUser();
    this.router.navigate(["login"]);
  }

}
