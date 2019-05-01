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
      'Authorization': 'Bearer BQBKtsrbVFpFYwflDsIXYcTN-2oD6ZBnxKkaLmk0YLt3ZIPtX2pLKwC7xnYvdqyovrtvgeU02-e6FWywizo'
    });

    return this.http.get( url, {headers});
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
