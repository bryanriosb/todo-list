import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Components
import { HeaderComponent } from './components/layout/header/header.component';
import { ModalHeaderComponent } from './components/layout/modal-header/modal-header.component';

import { CustomDateAdapter } from './services/date-time/custom-adapter';
import { DateAdapter } from '@angular/material/core';
import { DateTimeService } from './services/date-time/date-time.service';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);


// Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HeaderComponent,
    ModalHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Material
    MatProgressSpinnerModule,


  ],
  exports: [
    HeaderComponent,
    ModalHeaderComponent,

    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Material
    MatProgressSpinnerModule,
  ],
  providers: [
    CustomDateAdapter,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [DateTimeService]
    },
    {
      provide: LOCALE_ID,
      useValue:'es'
    }
  ]
})
export class SharedModule { }
