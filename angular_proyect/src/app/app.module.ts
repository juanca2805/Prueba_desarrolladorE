// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { SecundarioComponent } from './secundario/secundario.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    SecundarioComponent,
  ],
  imports: [
    BrowserModule,
    // Otros módulos que puedas necesitar
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
