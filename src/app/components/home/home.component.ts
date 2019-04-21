import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];

  loading: boolean;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        this.newReleases= data;
        this.loading = false;
      })
  }

  ngOnInit() {
  }

}
