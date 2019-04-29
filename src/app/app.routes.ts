import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';

export const ROUTES: Routes = [
    { path:'home', component: SearchComponent },
    { path:'artist/:id', component: ArtistComponent},
    { path:'album/:id', component: AlbumComponent},
    { path:'', pathMatch: 'full', redirectTo: 'home' },
    { path:'**', pathMatch: 'full', redirectTo: 'home' }
];