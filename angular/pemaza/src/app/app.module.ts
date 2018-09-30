import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { ClientComponent } from './components/client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientListComponent,
    ClientRegisterComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routes
  ],
  providers: [ ClientService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
