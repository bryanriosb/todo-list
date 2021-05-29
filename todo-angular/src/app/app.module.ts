import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

import localeEs from '@angular/common/locales/es';
import { AsyncPipe, registerLocaleData } from '@angular/common';

import { CustomPaginator } from './shared/configurations/CustomPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,

    IonicModule.forRoot(),
    
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    AsyncPipe,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
