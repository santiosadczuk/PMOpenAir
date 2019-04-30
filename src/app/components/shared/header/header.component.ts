import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService,
              private router: Router) { }

  lookArtist( id: any ){
    
    let artistId= id;


    this.router.navigate(['/artist', artistId]);

    this.mostrar();
  }

  mostrar() {
      var x = document.getElementById('search');
      if (x.style.display === 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
  }

  buscar(termino: string){
    this.loading= true;
    this.spotify.getFiveArtists( termino )
      .subscribe( (data: any) =>{
        this.artists = data;
        this.loading= false;
        console.log(data);
      })
    
  }

  ngOnInit() {
  }

}
