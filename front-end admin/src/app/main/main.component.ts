import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public Editor = ClassicEditor;
  isCollapsed = false;
  user: any = {};
  token: string | null = '';
  constructor(
    private router: Router,
    private _storageService: StorageService,
  ) {

  }

  ngOnInit(): void {
    let token = this._storageService.getToken();
    if(!token){
      this.router.navigate(["login"]);
    }
    else{
      this.user = this._storageService.getUser();
    }
  }

  logout() {  
    this._storageService.signOut();
    this.token = this._storageService.getToken();
    this.user = this._storageService.getUser();
    this.router.navigate(["login"]);
  }

}
