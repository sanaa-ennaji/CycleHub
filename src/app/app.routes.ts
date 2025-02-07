import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';

export const routes: Routes = [
    {path: '' , component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];
