import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: any;
  body = new URLSearchParams({
    grant_type: "client_credentials"
  });
  header = new HttpHeaders({
    Authorization:
      "Basic <base64 encoded  050b1e19c2ba427cb0af4e20252b680e:b34482186150439d9d074da60d5ed545>"
  });
  constructor(private http: HttpClient) {
    this.token =
      "BQD-GxNbLXPNQZEnLLZJujcqhArgA4sj3bLr1OJDMsfpJzdFkUmlDpE63yx5o5kDXxsqs2ZAR1QHufYzXSg";
  }
  getToken() {
    this.http
      .post("https://accounts.spotify.com/api/token", this.body, {
        headers: this.header
      })
      .subscribe(data => {

        return data;
      });
  }
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });
    return this.http.get(url, { headers });
  }

  /*
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: "Bearer BQBBGh_VE6vBa6cc3tlX6LZZmLpKwwrCc4esMBtq8TGFFukHK94vf8007SZxtOTm8i0g1-PqhrxiU43D7m4"
    });
    return this.http.get(url, { headers });
  }
  */

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
