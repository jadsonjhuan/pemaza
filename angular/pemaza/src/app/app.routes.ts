import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES : Routes = [
    {path : '', component: ClientListComponent},
    {path: 'register', component: ClientRegisterComponent},
    {path: 'register/:id', component: ClientRegisterComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);