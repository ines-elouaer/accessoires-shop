import { Routes } from '@angular/router';
import { ListeAccessoiresComponent } from './composants/liste-accessoires/liste-accessoires.component';
import { AjoutAccessoireComponent } from './composants/ajout-accessoire/ajout-accessoire.component';
import { EditAccessoireComponent } from './composants/edit-accessoire/edit-accessoire.component';
import { HomeComponent } from './composants/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'liste', component: ListeAccessoiresComponent },
  { path: 'ajouter', component: AjoutAccessoireComponent },
  { path: 'modifier/:id', component: EditAccessoireComponent }

];
