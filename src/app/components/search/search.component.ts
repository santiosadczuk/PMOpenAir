import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';
import { FavoritesService } from 'src/app/services/favorites.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


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
              private favoritesService: FavoritesService,
              private router: ActivatedRoute,) {
                
                this.router.params.subscribe( params => {
                  this.getTrack( params ['ids']);
                  })
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

  removeTrackToFavs( id: string){    
    this.favoritesService.removeFavorite(id);
  }

  ngOnInit() {
  }

}
