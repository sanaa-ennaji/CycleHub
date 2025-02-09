import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SidebareComponent } from './components/Shared/sidebare/sidebare.component';
import { DemandeListComponent } from './components/Dashboard/demande-list/demande-list.component';
import { CollectionsListComponent } from './components/Collectors/collections-list/collections-list.component';


export const routes: Routes = [
    {path: '' , component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'demande', component: DemandeListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'side', component : SidebareComponent},
    {path: 'collectionsList', component: CollectionsListComponent}

];
