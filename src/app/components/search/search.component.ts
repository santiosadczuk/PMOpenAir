import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  favs: any[] = [];
  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService,
              private favoritesService: FavoritesService) {
                
                
              }
  
  getTrack( ids: string){

    
    this.spotify.getTracks(this.favoritesService.favorites)
      .subscribe( track => {
        this.favs = track;        
      });

 } 

  buscar(termino: string){
    this.loading= true;
    this.spotify.getArtists( termino )
      .subscribe( (data: any) =>{
        this.artists = data;
        this.loading= false;
      })
    
  }

  ngOnInit() {
  }

}
