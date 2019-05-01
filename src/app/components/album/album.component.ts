import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any = {};
  albumTracks: any = {};  

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService,
              private favoritesService: FavoritesService,
              private storeService: StoreService,
              private _router: Router) {

                this.router.params.subscribe( params => {
                  this.getAlbum( params ['id']);
                  this.getAlbumTracks( params ['id']);
                })
                
                this.storeService.loadStorageAlbum();
                
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
    this.storeService.fav.push(id);
  }

  ngOnInit() {
    
  }

  orderBy = type => {
    if (type == "down") {
      this.albumTracks.sort((a, b) => {
        if (a.duration_ms > b.duration_ms) {
          return 1;
        } else if (a.duration_ms < b.duration_ms) {
          return -1;
        }
        return 0;
      });
    }
    if (type == "up") {
      this.albumTracks.sort((b, a) => {
        if (a.duration_ms > b.duration_ms) {
          return 1;
        } else if (a.duration_ms < b.duration_ms) {
          return -1;
        }
        return 0;
      });
    }
  };
}
