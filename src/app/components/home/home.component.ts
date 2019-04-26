import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  
  loading: boolean;

  constructor( private spotify: SpotifyService,
               private favorites: FavoritesService) {

    this.loading = true;
    
    console.log(favorites.favorites);

    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        this.newReleases= data;
        this.loading = false;
      })
  }

  ngOnInit() {
  }

}
