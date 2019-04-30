import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any = {};
  albumTracks: any = {};

  fav: any[] = [];

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService,
              private favoritesService: FavoritesService,
              private _router: Router) {

                this.router.params.subscribe( params => {
                  this.getAlbum( params ['id']);
                  this.getAlbumTracks( params ['id']);
                })
                
                this.loadStorage();
                
              }

  getAlbum( id: string ){

    this.spotify.getAlbum( id )
      .subscribe( album => {
      
      this.album = album;
      
    })
  }
  
  getAlbumTracks( id: string ){

    this.spotify.getAlbumTracks( id )
      .subscribe( albumTracks => {

      this.albumTracks = albumTracks;
      
    })
  }

  addTrackToFavs( id: string){    
    this.favoritesService.addFavorite(id);
    this.fav.push(id);
  }

  loadStorage() {
    if (localStorage.getItem('favorites')) {
      this.fav = JSON.parse(localStorage.getItem('favorites'));
    } else {
      this.fav = [];
    }
  }

  ngOnInit() {
    
  }

}
