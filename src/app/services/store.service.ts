import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  favorites: any[] = [];
  fav: any[] = [];

  constructor() { }

  loadStorageHome() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    } else {
      this.favorites = [];
    }
  }

  loadStorageAlbum() {
    if (localStorage.getItem('favorites')) {
      this.fav = JSON.parse(localStorage.getItem('favorites'));
    } else {
      this.fav = [];
    }
  }
}
