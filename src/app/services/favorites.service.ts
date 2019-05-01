import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  

  constructor(private storeService:StoreService) { 

    this.storeService.loadStorageHome();

  }

  addFavorite(id: string){
    this.storeService.favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(this.storeService.favorites));
  }
  
  removeFavorite(id: string) {
    this.storeService.favorites = this.storeService.favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(this.storeService.favorites));
    
  }

}
