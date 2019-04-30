import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: any[] = [];

  constructor() { 

    this.loadStorage();

  }

  addFavorite(id: string){
    this.favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  
  removeFavorite(id: string) {
    this.favorites = this.favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    
  }

  loadStorage() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    } else {
      this.favorites = [];
    }
  }

}
