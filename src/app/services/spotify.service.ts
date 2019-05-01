import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: "Bearer BQAorhxPWdfv6YV35pewB-sgi0dC24tt8a9vqibh_OHiM0jMid1THZU47t424fz6eUaQQZtu_0aS3yeMUWo"
    });
    return this.http.get(url, { headers });
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      .pipe( map( data => data['artists'].items));
      
  }

  getFiveArtists(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=5`)
      .pipe( map( data => data['artists'].items));
      
  }

  getArtist(id: string){

    return this.getQuery(`artists/${ id }`);
      
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

  getTracks( ids: string[] ){
    
    return this.getQuery(`tracks?ids=${ ids }`)
      .pipe(map(data => data["tracks"]));
    
  }
}
