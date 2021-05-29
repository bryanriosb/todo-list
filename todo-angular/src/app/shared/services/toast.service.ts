import { Injectable } from '@angular/core';
import { MatSnackBar  } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private snackbar: MatSnackBar  ) {  }

  succes( message: string, action?: string, duration?: number) {
    let dur = 3000;
    if(duration) dur = duration;
   
    this.snackbar.open( message, action, {
      panelClass: 'style-succes',    
      duration: dur,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'

    });  
  }

  warning( message: string, action?: string, duration?: number) {
    let dur = 3000;
    if(duration) dur = duration;

    this.snackbar.open( message, action, {
      panelClass: 'style-warning',    
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'

    });  
  }

  error( message: string, action?: string, duration?: number) {
    let dur = 3000;
    if(duration) dur = duration;

    this.snackbar.open( message, action, {
      panelClass: 'style-error',    
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'

    });  
  }
 
}
