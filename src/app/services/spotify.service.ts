import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {}

  getQuery( query:string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAHta3zCp5Q4JX47kdRULiC2QWIUp1TFyKVEmT6CEcggOcSgsr3Lv3djGTjpDizJqJPM-xm4uVoLZQNeoM'
    });

    return this.http.get( url, {headers});
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases')
      .pipe( map( data => data['albums'].items));
 
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      .pipe( map( data => data['artists'].items));
      
  }

  getArtist(id: string){

    return this.getQuery(`artists/${ id }`);
      
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${ id }/top-tracks?country=AR`)
      .pipe( map( data => data['tracks']));
      
  }

  getAlbums(id: string){

    return this.getQuery(`artists/${ id }/albums`)
      .pipe( map( data => data['items']));
      
  }

  getAlbum( id:string ){
    
    return this.getQuery(`albums/${ id }`);
  }

  getAlbumTracks(id: string){

    return this.getQuery(`albums/${ id }/tracks`)
      .pipe( map( data => data['items']));
      
  }
}
