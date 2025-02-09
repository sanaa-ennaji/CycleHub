import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { DemandeRequestComponent } from './components/Dashboard/demande-request/demande-request.component';
import { SidebareComponent } from './components/Shared/sidebare/sidebare.component';

export const routes: Routes = [
    {path: '' , component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'demande', component: DemandeRequestComponent},
    {path: 'login', component: LoginComponent},
    {path: 'side', component : SidebareComponent}

];
