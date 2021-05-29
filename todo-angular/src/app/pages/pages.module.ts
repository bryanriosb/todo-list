import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [PagesComponent],
    
  imports: [

    CommonModule,
    PagesRoutingModule,
    RouterModule,
    HttpClientModule,
    

    FlexLayoutModule,
    IonicModule,

    SharedModule,
    
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class PagesModule { }
