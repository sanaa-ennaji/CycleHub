import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { DemandeListComponent } from './components/Dashboard/demande-list/demande-list.component';
import { CollectionsListComponent } from './components/Collectors/collections-list/collections-list.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RequestListComponent } from './components/Collectors/request-list/request-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }, 
  { path: 'demande', component: DemandeListComponent, canActivate: [authGuard] },
  { path: 'collectionsList', component: CollectionsListComponent, canActivate: [authGuard] }, 
  { path: 'requestList', component: RequestListComponent, canActivate: [authGuard] } 
];
