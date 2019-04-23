import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

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
              private _router: Router) {

                this.router.params.subscribe( params => {
                  this.getAlbum( params ['id']);
                  this.getAlbumTracks( params ['id']);
                })
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
  

  ngOnInit() {
  }

}
