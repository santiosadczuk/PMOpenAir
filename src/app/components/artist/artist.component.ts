import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];
  albums: any[] = [];

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService,
              private _router: Router ) {

    this.loadingArtist = true;

    this.router.params.subscribe( params =>{
      this.getArtist( params['id'] );
      this.getTopTracks( params['id'] );
      this.getAlbums( params ['id']);
    });
  }

  getArtist( id: string){

    this.loadingArtist = true;
    this.spotify.getArtist( id )
      .subscribe( artist => {
      
      this.artist = artist;
      this.loadingArtist = false;
    })
  }

  getTopTracks( id: string ){

    this.spotify.getTopTracks( id )
      .subscribe( topTracks => {
        this.topTracks = topTracks;
      })
  }
  getAlbums( id: string ){

    this.spotify.getAlbums( id )
      .subscribe( albums => {
        this.albums = albums;
      })
  }
  lookAlbum( album: any ){

    let albumId;

    if( album.type === 'album'){
      albumId = album.id;
    }else{
      albumId = album.album[0].id;
    }

    this._router.navigate(['/album', albumId]); 
  }

  ngOnInit() {
  }

}
