import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { DeleteComponent } from './components/delete/delete.component';
import { RouterLoaderComponent } from './components/router-loader/router-loader.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CustomDateAdapter } from './services/date-time/custom-adapter';
import { DateAdapter } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { AccountComponent } from './components/account/account.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DeleteComponent,
    RouterLoaderComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    IonicModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule, 
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    
    NgbModule,

  ],
  exports: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterLoaderComponent,

    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
    IonicModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule, 
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule

  ],
  providers: [
    CustomDateAdapter,
    { 
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    }
  ]
})
export class SharedModule { }
