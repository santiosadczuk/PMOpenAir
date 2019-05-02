import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';
import { FavoritesService } from 'src/app/services/favorites.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  favs: any[] = [];
  artists: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService,
              private favoritesService: FavoritesService,
              private storeService: StoreService,
              private router: ActivatedRoute,) {
                
                this.error = false;

                this.router.params.subscribe( params => {
                  this.getTrack( params ['ids']);
                  })
              }
  
  getTrack( ids: string){

    
    this.spotify.getTracks(this.storeService.favorites)
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
      } , ( errorService ) => {
        this.error = true;
        this.loading= false;
        this.mensajeError = errorService.error.error.message;
      })
    
  }

  removeTrackToFavs( id: string){    
    this.favoritesService.removeFavorite(id);
  }

  ngOnInit() {
  }

}
