import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../../services/rest.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  public spinner = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rest: RestService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  async delete() {
    try {
      let path = this.data;
      this.rest.delete(path).toPromise();
      this.toast.succes('Datos eliminados');
      this.spinner = true;
      this.dialogRef.close(true);

    } catch(e) {
      this.spinner = true;
      this.toast.error('No se pudo eliminar los datos, por favor intente de nuevo');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
