import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private sanitizer: DomSanitizer) {}
  
  url: string = environment.API.url;

  page() {
    return {
      totalPages: 0,
      totalItem: 0,
      size: 10,
      page: 1,
    };
  }

  base64ToImage(image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${image}`
    );
  }
}
