import { Injectable, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  

  latLng: any;
  draggLatLng: any;

  constructor( private dialog: MatDialog,) { }


  async showDialog( component: any, width: string, height?: string, fix?: boolean) {

    let dataSource;


    const dialogRef = this.dialog.open(
      component, {
        disableClose: fix,
        height: height,
        width: width,
        data: { latLng: this.latLng, draggLatLng: this.draggLatLng  }
        
      }
    );

    const response = await dialogRef.afterClosed().toPromise();

    return response;

  }

  async showDialogData( component: any, width: string, height?: string, fix?: boolean, data?: any ) {

    const dialogRef = this.dialog.open(
      component, {
        disableClose: fix,
        height: height,
        width: width,
        data: data
        
      }
    );

    const response = await dialogRef.afterClosed().toPromise();

    return response;

  }


}
